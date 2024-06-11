import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import ButtonComponent from "../components/CustomComponent/Button";
import Input from "../components/CustomComponent/Input";
import useYupValidation from "../hooks/useYupValidation";
import { passwordValidationSchema } from "../validation/auth";
import { api } from "../services/password";
import { useMutation } from "@tanstack/react-query";

const ResetPassword = () => {
  const [responseData, setResponseData] = useState(null);

  const {
    value: password,
    error: passwordError,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
  } = useYupValidation("", passwordValidationSchema);

  const {
    value: confirmPassword,
    error: confirmPasswordError,
    handleInputChange: handleConfirmPasswordChange,
    handleInputBlur: hanldeConfirmPasswordBlur,
  } = useYupValidation("", passwordValidationSchema);

  const { value: confirmationCode, handleInputChange: handleConfirmationCode } =
    useYupValidation("");

  const resetPasswordMutation = useMutation({
    mutationFn: (data) =>
      api.patch(`/api/v1/auth/resetpassword/${confirmationCode}`, data),
    onSuccess: (data) => {
      Alert.alert("Success", "Password has been reset");
      setResponseData(data);
      // Optionally, navigate to login or other screen
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to reset password");
    },
  });

  const handleActionToResetPassword = () => {
    if (!confirmationCode) {
      Alert.alert("Error", "Verification code is required");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    resetPasswordMutation.mutate({
      password: password,
      confirmPassword: confirmPassword,
    });
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
            <Input
              placeholder="Password"
              value={password}
              onChangeText={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={passwordError}
            />

            <Input
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              onBlur={hanldeConfirmPasswordBlur}
              error={confirmPasswordError}
            />
            <ButtonComponent
              className="w-full bg-blue-700/70 p-3 rounded-2xl mb-3"
              handleOnPress={handleActionToResetPassword}
              //disabled={loading}
            >
              {/* activity loading  for button*/}
              <View className=" justify-center items-center">
                {resetPasswordMutation.isPending ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text className="text-lg font-mulishsemibold text-white text-center">
                    Reset Password
                  </Text>
                )}
              </View>
            </ButtonComponent>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;
