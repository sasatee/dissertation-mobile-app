import { useMutation } from "@tanstack/react-query";
import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import ButtonComponent from "../../components/CustomComponent/Button";
import Input from "../../components/CustomComponent/Input";
import useYupValidation from "../../hooks/useYupValidation";
import { sendResetEmail } from "../../services/password";
import { emailValidationSchema } from "../../validation/auth";
import { useNavigation } from "@react-navigation/native";

import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const RequestEmailScreen = () => {
  const {
    value: email,
    error: emailError,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
  } = useYupValidation("", emailValidationSchema);
  const navigation = useNavigation();
  const { mutate, error, data, isPending } = useMutation({
    mutationFn: sendResetEmail,
  });
  console.log(error, data);
  const handlePasswordResetRequest = () => {
    try {
      mutate(
        // { email: "Ahmad@gmail.com" }
        { email: email }
      );
      navigation.navigate("ResetPassword");
    } catch (error) {
      console.log("Error sending reset email:", error);
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
              placeholder="Email"
              value={email}
              onChangeText={handleEmailChange}
              onBlur={handleEmailBlur}
              error={emailError}
            />
            <ButtonComponent
              className="w-full bg-blue-700/70 p-3 rounded-2xl mb-3"
              handleOnPress={handlePasswordResetRequest}
              //disabled={loading}
            >
              {/* activity loading  for button*/}
              <Animated.View
                entering={FadeInDown.delay(900).duration(1000).springify()}
                className=" justify-center items-center"
              >
                {isPending ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text className="text-lg font-mulishsemibold text-white text-center">
                    send email
                  </Text>
                )}
              </Animated.View>
            </ButtonComponent>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RequestEmailScreen;
