import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import React from "react";
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
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import useYupValidation from "../hooks/useYupValidation";
import { setIsDoctor, signInUser } from "../redux/slice/authenticationSlice";
import {
  emailValidationSchema,
  passwordValidationSchema,
} from "../validation/auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../util/colors";

import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import ButtonComponent from "../components/CustomComponent/Button";
import Input from "../components/CustomComponent/Input";
import useAuth from "../hooks/useGoogle";

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

  const handleUserLogin = async () => {
    const userCredentials = {
      email: "paul@gmail.com",
      password: "secretpassword1@",
    };
    setLoading(true);
    try {
      const result = await dispatch(signInUser(userCredentials));
      // const result = await dispatch(signInUser({ email, password }));

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
        "Please verify if correct enter password or email",
        ToastAndroid.TOP
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.navigate("RequestEmail");
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

          <TouchableOpacity
            style={styles.backButtonWrapper}
            onPress={handleGoBack}
          >
            <Ionicons name={"arrow-back-outline"} color="black" size={25} />
          </TouchableOpacity>

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
              />

              <Input
                placeholder="Password"
                value={password}
                onChangeText={handlePasswordChange}
                onBlur={handlePasswordBlur}
                //secureTextEntry
                error={passwordError}
              />

              {/* Button */}
              <Animated.View
                entering={FadeInDown.delay(600).duration(1000).springify()}
                className="w-full"
              >
                <ButtonComponent
                  className="w-full bg-blue-700/70 p-3 rounded-2xl mb-3"
                  handleOnPress={handleUserLogin}
                  //disabled={loading}
                >
                  {/* activity loading  for button*/}
                  <View className=" justify-center items-center">
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
});
