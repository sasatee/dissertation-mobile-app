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
  StyleSheet,
} from "react-native";
import ButtonComponent from "../../components/CustomComponent/Button";
import Input from "../../components/CustomComponent/Input";
import useYupValidation from "../../hooks/useYupValidation";
import { passwordValidationSchema } from "../../validation/auth";
import { api } from "../../services/password";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import PINInput from "../../components/CustomComponent/PINInput";

const ResetPassword = () => {
  const [responseData, setResponseData] = useState(null);
  const [pin, setPin] = useState("");

  const navigation = useNavigation();

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

  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const resetPasswordMutation = useMutation({
    mutationFn: (data) => api.patch(`/api/v1/auth/resetpassword/${pin}`, data),
    onSuccess: (data) => {
      Alert.alert("Success", "Password has been reset");
      setResponseData(data);
      // Optionally, navigate to login or other screen
      navigation.navigate("Login");
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to reset password");
    },
  });

  const handlePINChange = (newPIN) => {
    setPin(newPIN);
  };

  const handleActionToResetPassword = () => {
    if (!pin) {
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
            <View className=" py-4">
              <PINInput onPINChange={handlePINChange} />
            </View>
            <Input
              placeholder="Password"
              value={password}
              onChangeText={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={passwordError}
              secureTextEntry={!showPassword}
            />
            

            <Input
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              onBlur={hanldeConfirmPasswordBlur}
              error={confirmPasswordError}
              secureTextEntry={!showPassword}
            />
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={26}
              color="#aaa"
              style={styles.icon}
              onPress={toggleShowPassword}
            />

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
                {resetPasswordMutation.isPending ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text className="text-lg font-mulishsemibold text-white text-center">
                    Reset Password
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

export default ResetPassword;

const styles = StyleSheet.create({
  icon: {
    left: 120,
    top: -75,
    color: "white",
  },
});
