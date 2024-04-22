import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
  Alert,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import ButtonComponent from "../components/Button";
import Input from "../components/Input";
import useYupValidation from "../hooks/useYupValidation";
import {
  emailValidationSchema,
  passwordValidationSchema,
  passwordConfirmationSchema,
} from "../validation/auth";
import { signUpUser } from "../redux/slice/authenticationSlice";

const RegisterScreen = () => {
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
  } = useYupValidation("", passwordValidationSchema);
  const {
    value: confirmPassword,
    error: confirmPasswordError,
    handleInputChange: handleConfirmPasswordChange,
    handleInputBlur: handleConfirmPasswordBlur,
  } = useYupValidation("", passwordConfirmationSchema);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleUserSignup = async () => {
    const body = {
      firstName: "john1",
      lastName: "smith1",
      email: "john1@gmail.com",
      password: "secretpassword1@",
      // isDoctor:true,
      gender: "male",
      // profilePicture: "daddadadadadaaavva",
    };
    try {
      await dispatch(signUpUser(body));

      //const result = await dispatch(signInUser({ email, password }).unwrap());
    } catch (error) {
      Alert.alert("Invaid Credentials For Register");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -500}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, zIndex: 50 }}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white h-full w-full">
          <StatusBar styles="white" />

          <Animated.Image
            entering={FadeInUp.delay(200).duration(1000).springify()}
            className="h-full w-full absolute"
            source={require("../assets/images/background.jpg")}
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
                placeholder="Email"
                value={email}
                onChangeText={handleEmailChange}
                onBlur={handleEmailBlur}
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

              {/* <Input
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                onBlur={handleConfirmPasswordBlur}
                //secureTextEntry
                error={confirmPasswordError}
              /> */}

              {/* Button */}
              <Animated.View
                entering={FadeInDown.delay(600).duration(1000).springify()}
                className="w-full"
              >
                <ButtonComponent
                  className="w-full bg-blue-700/70 p-3 rounded-2xl mb-3"
                  handleOnPress={handleUserSignup}
                >
                  <Text className="text-xl font-mulishsemibold text-white text-center">
                    Register
                  </Text>
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
};

export default RegisterScreen;
