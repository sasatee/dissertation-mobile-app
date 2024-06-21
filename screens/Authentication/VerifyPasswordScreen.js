import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
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
import ButtonComponent from "../../components/CustomComponent/Button";
import Input from "../../components/CustomComponent/Input";
import useYupValidation from "../../hooks/useYupValidation";
import { api } from "../../services/password";
import PINInput from "../../components/CustomComponent/PINInput";

import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function VerifyEmailPassword() {
  const navigation = useNavigation();

  const [pin, setPin] = useState("");

  const { data, isFetching, refetch, error } = useQuery({
    queryFn: () => api.get(`/api/v1/auth/verifyemail/${pin}`),
    queryKey: ["verifyemail", pin],
    enabled: false,
    onSuccess: () => {
      Alert.alert("Success", "Email has been verified successfully");
      navigation.navigate("Login");
    },
    onError: (error) => {
      Alert.alert("Please verify your email before expiration");
      // navigation.navigate("Login");
    },
  });
  const handlePINChange = (newPIN) => {
    setPin(newPIN);
  };

  const handleActionToResetPassword = async () => {
    if (!pin) {
      Alert.alert("Error", "Verification code is required");
      return;
    }
    // Refetch query manually
    await refetch();
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
            <View className=" py-4">
              <PINInput onPINChange={handlePINChange} />
            </View>

            <ButtonComponent
              className="w-full bg-blue-700/70 p-3 rounded-2xl mb-3"
              handleOnPress={handleActionToResetPassword}
              //disabled={loading}
            >
              {/* activity loading  for button*/}
              <Animated.View
                entering={FadeInDown.delay(900).duration(1000).springify()}
                className=" justify-center items-center"
              >
                {isFetching ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text className="text-lg font-mulishsemibold text-white text-center">
                    Verify Email
                  </Text>
                )}
              </Animated.View>
            </ButtonComponent>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
