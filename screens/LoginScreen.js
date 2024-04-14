import {
  View,
  Text,
  Pressable,
  ImageBackground,
  Alert,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React from "react";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import useAuth from "../hooks/useGoogle";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { signInUser } from "../redux/slice/authenticationSlice";

import Input from "../components/Input";
import useYupValidation from "../hooks/useYupValidation";
import ButtonComponent from "../components/Button";
import { setJwtToken } from "../redux/slice/authenticationSlice";

import {
  emailValidationSchema,
  passwordValidationSchema,
} from "../validation/auth";

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
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

  //JWT
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleUserLogin = async () => {
    try {
       await dispatch(signInUser({ email, password }));
      const result =  dispatch(signInUser({ email, password }));
      if (result.payload) {
       navigation.navigate("Home")
        dispatch(setJwtToken(result.payload.token));
      }
    } catch (error) {
      Alert.alert("Invalid Crendentials", error.message);
    }
  };

  // const handleUserLogin = async () => {
  //   // const userCredentials = {
  //   //   email: "test@gmail.com",
  //   //   password: "secretpassword1@",
  //   // };
  //   try {
  //     const result =  dispatch(signInUser({ email, password }))
  //     // const result =  dispatch(signInUser(userCredentials));
  //     if (result.payload && result.payload.token) {
  //       navigation.navigate("Home")
  //       //console.log("JWt Token saved", result.payload);
  //       dispatch(setJwtToken(result.payload.token));
  //     }else{
  //       Alert.alert("Login failed","Invalid credentials")
  //     }
  //   } catch (error) {
  //     Alert.alert("Invalid Crendentials", error.message);
  //   }
  // };

  return (
    <SafeAreaView className="flex-1 my-20 mx-10">
      <Input
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        onBlur={handleEmailBlur}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <Input
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
        onBlur={handlePasswordBlur}
        //secureTextEntry
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <View className="py-2">
        <ButtonComponent title="login" handleOnPress={handleUserLogin} />
      </View>
      <View className="py-2 justify-center items-center">
        <GoogleSigninButton
          accessibilityHint="accessibilityHint"
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInWithGoogle}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    left: 9,
    paddingTop: 2,
  },
});

