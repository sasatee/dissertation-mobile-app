import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import useYupValidation from "../../hooks/useYupValidation";
import { setIsDoctor, signInUser } from "../../redux/slice/authenticationSlice";

import {
  emailValidationSchema,
  passwordValidationSchema,
} from "../../validation/auth";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import ButtonComponent from "../../components/CustomComponent/Button";
import Input from "../../components/CustomComponent/Input";
import useAuth from "../../provider/GoogleProvider";

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    value: email,
    error: emailError,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
  } = useYupValidation("", emailValidationSchema);

  const {
    value: password,
    error: passwordError,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    setLoading,
    loading,
  } = useYupValidation("", passwordValidationSchema);

  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUserLogin = async () => {
    const userCredentials = {
      email: "Thomas@gmail.com",
      password: "Qwerty@1",
    };
    setLoading(true);
    try {
     // const result = dispatch(signInUser(userCredentials));
      const result =  dispatch(signInUser({ email, password }));
    

      if (result.payload.token) {
        dispatch(
          setIsDoctor({ user: { isDoctor: result.payload.user.isDoctor } })
        );
        ToastAndroid.show("Login Successfully!", ToastAndroid.TOP);

        // Optionally clear input fields
        handleEmailChange("");
        handlePasswordChange("");
      }
    } catch (error) {
      ToastAndroid.show(
        "Please verify if correctly enter password or email",
        ToastAndroid.TOP
      );
    } finally {
      setLoading(false);
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

          <Animated.Image
            entering={FadeInUp.delay(200).duration(1000).springify()}
            className="h-full w-full absolute"
            source={require("../../assets/images/unslash.png")}
          />

          {/* light */}
          <View className="flex-row justify-around w-full absolute">
            <Animated.Image
              entering={FadeInUp.delay(200).duration(1000).springify()}
              className="h-[255] w-[90]"
              source={require("../../assets/images/light.png")}
            />

            <Image
              className="h-[160] w-[65]"
              source={require("../../assets/images/light.png")}
            />
          </View>

          {/* title and form */}
          <View className="h-full w-full flex justify-around pt-40 pb-10">
            {/* title */}
            <View className="flex items-center -pt-10">
              <Animated.Text
                entering={FadeInUp.duration(1000).springify().damping(100)}
                className="text-white/90 text-5xl font-bold tracking-tighter "
              >
                Login
              </Animated.Text>
            </View>
            {/* form */}

            <View className="flex items-center mx-4 space-y-6">
              <Input
                placeholder="Email"
                value={email}
                onChangeText={handleEmailChange}
                onBlur={handleEmailBlur}
                error={emailError}
                keyboardType="email-address"
              />

              <Input
                placeholder="Password"
                value={password}
                onChangeText={handlePasswordChange}
                onBlur={handlePasswordBlur}
                secureTextEntry={!showPassword}
                error={passwordError}
              />
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={26}
                color="#aaa"
                style={styles.icon}
                onPress={toggleShowPassword}
              />
              <View className="-top-16 left-16">
                <Pressable onPress={() => navigation.push("RequestEmail")}>
                  <Text className="font-mono text-blue-800/95 -top-6">
                    Forgot password?
                  </Text>
                </Pressable>
              </View>

              {/* Button */}
              <Animated.View
                entering={FadeInDown.delay(600).duration(1000).springify()}
                className="w-full -top-5"
              >
                <ButtonComponent
                  className="w-full bg-blue-700/70 p-3 rounded-2xl mb-3"
                  handleOnPress={handleUserLogin}
                  //disabled={loading}
                >
                  {/* activity loading  for button*/}
                  <View className=" flex justify-center items-center">
                    {loading ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <Text className="text-xl font-mulishsemibold text-white text-center">
                        Login
                      </Text>
                    )}
                  </View>
                </ButtonComponent>
              </Animated.View>

              <Animated.View
                entering={FadeInDown.delay(800).duration(1000).springify()}
                className="flex-row justify-center p-0"
              >
                <Text className="font-mulishextrabold">
                  Don't have an account ?
                </Text>
                <Pressable onPress={() => navigation.push("Register")}>
                  <Text className="font-extralight text-blue-800/95">
                    {" "}
                    Register
                  </Text>
                </Pressable>
              </Animated.View>

              <View className="p-2">
                <Text className="text-center  text-base font-mulishsemibold text-black">
                  or continue with
                </Text>
                <Animated.View
                  entering={FadeInDown.delay(900).duration(1000).springify()}
                  className="flex flex-row justify-center my-2"
                >
                  <GoogleSigninButton
                    style={{ paddingBottom: 30 }}
                    accessibilityHint="accessibilityHint"
                    size={GoogleSigninButton.Size.Icon}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signInWithGoogle}
                  />
                </Animated.View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  backButtonWrapper: {
    margin: 10,
    height: 40,
    width: 40,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    left: 120,
    top: -85,
    color: "white",
  },
});
