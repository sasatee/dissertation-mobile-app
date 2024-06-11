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
  Text,
  ToastAndroid,
  View,
} from "react-native";

import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import ButtonComponent from "../components/CustomComponent/Button";
import DropDown from "../components/CustomComponent/DropDownGender";
import Input from "../components/CustomComponent/Input";
import useYupValidation from "../hooks/useYupValidation";
import { signUpUser } from "../redux/slice/authenticationSlice";
import {
  emailValidationSchema,
  //TODO
  ///passwordConfirmationSchema,
  firstNameValidationSchema,
  lastnameValidationSchema,
  passwordValidationSchema,
} from "../validation/auth";

export default function RegisterScreen() {
  const {
    value: email,
    error: emailError,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
  } = useYupValidation("", emailValidationSchema);
  const {
    value: firstName,
    error: firstnameError,
    handleInputBlur: handleFirstnameBlur,
    handleInputChange: handleFirstnameChange,
  } = useYupValidation("", firstNameValidationSchema);

  const {
    value: lastName,
    error: lastnameError,
    handleInputBlur: handlelastnameBlur,
    handleInputChange: handlelastnameChange,
  } = useYupValidation("", lastnameValidationSchema);

  const {
    value: password,
    error: passwordError,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    setLoading,
    loading,
  } = useYupValidation("", passwordValidationSchema);
  //TODO
  // const {
  //   value: confirmPassword,
  //   error: confirmPasswordError,
  //   handleInputChange: handleConfirmPasswordChange,
  //   handleInputBlur: handleConfirmPasswordBlur,
  // } = useYupValidation("", passwordConfirmationSchema);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [gender, setGender] = useState(null);

  const handleUserSignup = async () => {
    setLoading(true);
    try {
      const result = await dispatch(
        signUpUser({
          firstName,
          lastName,
          email,
          password,
          gender,
        })
      );
  
      if (result?.payload?.token) {
        navigation.replace("VerifyEmail");
        ToastAndroid.show("Register Succussfully!", ToastAndroid.SHORT);
      }
      

      // Optionally clear input fields
      handleEmailChange("");
      handlePasswordChange("");
      handleFirstnameChange("");
      handlelastnameChange("");
      setGender(null);
    } catch (error) {
    } finally {
      ToastAndroid.show("Make sure to enter all the input field correctly ", ToastAndroid.TOP);

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
            source={require("../assets/images/unslash.png")}
          />
          {/* light */}
          <View className="flex-row justify-around w-full absolute">
            <Animated.Image
              entering={FadeInUp.delay(200).duration(1000).springify()}
              className="h-[255] w-[90]"
              source={require("../assets/images/light.png")}
            />

            <Image
              className="h-[160] w-[65]"
              source={require("../assets/images/light.png")}
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
                Register
              </Animated.Text>
            </View>
            {/* form */}

            <View className="flex items-center mx-4 space-y-4">
              <Input
                type="text"
                placeholder="Firstname"
                value={firstName}
                onChangeText={handleFirstnameChange}
                onBlur={handleFirstnameBlur}
                error={firstnameError}
              />
              <Input
                type="text"
                placeholder="Lastname"
                value={lastName}
                onChangeText={handlelastnameChange}
                onBlur={handlelastnameBlur}
                error={lastnameError}
              />
              <Input
                placeholder="Email Address"
                value={email}
                onChangeText={handleEmailChange}
                onBlur={handleEmailBlur}
                //secureTextEntry
                error={emailError}
              />
              <Input
                placeholder="Password"
                value={password}
                onChangeText={handlePasswordChange}
                onBlur={handlePasswordBlur}
                //secureTextEntry
                error={passwordError}
              />

              <DropDown onGenderChange={setGender} Gender={gender} />

              {/* Button */}
              <Animated.View
                entering={FadeInDown.delay(600).duration(1000).springify()}
                className="w-full"
              >
                <ButtonComponent
                  className="w-full bg-blue-700/70 p-3 rounded-2xl mb-3"
                  handleOnPress={handleUserSignup}
                  disabled={loading}
                >
                  <View className="flex-1 justify-center items-center">
                    {loading ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <Text className="text-xl font-mulishsemibold text-white text-center">
                        Register
                      </Text>
                    )}
                  </View>
                </ButtonComponent>
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(800).duration(1000).springify()}
                className="flex-row justify-center p-0"
              >
                <Text className="font-mulishextrabold">Have an account?</Text>
                <Pressable onPress={() => navigation.push("Login")}>
                  <Text className="font-extralight text-blue-800/95">
                    {" "}
                    Login
                  </Text>
                </Pressable>
              </Animated.View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
