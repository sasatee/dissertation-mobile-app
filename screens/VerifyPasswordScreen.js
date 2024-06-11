import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
  Alert,
} from "react-native";
import ButtonComponent from "../components/CustomComponent/Button";
import Input from "../components/CustomComponent/Input";
import useYupValidation from "../hooks/useYupValidation";
import { api } from "../services/password";

export default function VerifyEmailPassword() {
  const navigation = useNavigation();
  const { value: confirmationCode, handleInputChange: handleConfirmationCode } =
    useYupValidation("");

  const { data, isFetching, refetch, error } = useQuery({
    queryFn: () => api.get(`/api/v1/auth/verifyemail/${confirmationCode}`),
    queryKey: ["verifyemail", confirmationCode],
    enabled: false, 
    onSuccess: () => {
      Alert.alert("Success", "Email has been verified successfully");
    },
    onError: (error) => {
      Alert.alert("Please verify your email before expiration");
    },
  });
  console.log("ERROR:::", error, data);

  const handleActionToResetPassword = async () => {
    if (!confirmationCode) {
      Alert.alert("Error", "Verification code is required");
      return;
    }
    // Refetch query manually
    await refetch();

    // Handle the data after fetching
    if (data) {
      // Use `data` as per your application's logic
      console.log(data);
      navigation.navigate("Login");

      // Additional logic here
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -500}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white h-full w-full">
          <StatusBar styles="white" />

          {/* title and form */}

          <View className="flex items-center mx-6 space-y-3 py-40">
            <Input
              placeholder="Verification Code"
              value={confirmationCode}
              onChangeText={handleConfirmationCode}
              //onBlur={handlePasswordBlur}
              //error={passwordError}
            />

            <ButtonComponent
              className="w-full bg-blue-700/70 p-3 rounded-2xl mb-3"
              handleOnPress={handleActionToResetPassword}
              //disabled={loading}
            >
              {/* activity loading  for button*/}
              <View className=" justify-center items-center">
                {isFetching ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text className="text-lg font-mulishsemibold text-white text-center">
                    Verify Email
                  </Text>
                )}
              </View>
            </ButtonComponent>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
