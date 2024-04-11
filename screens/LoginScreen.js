import { View, Text, Pressable, ImageBackground,Alert } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import useAuth from "../hooks/useGoogle";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import ButtonComponent from "../Components/Button";
import { signInUser } from "../redux/slice/authenticationSlice";

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();

  //JWT
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleUserLogin = async () => {
    const userCredentials = {
      email: "test@gmail.com",
      password: "secretpassword1@",
    };
    try {
      const result = await dispatch(signInUser(userCredentials));
      if (result.payload) {
        dispatch(setJwtToken(result.payload.token));
      }
    } catch (error) {
       //Alert.alert('Invalid Crendentials')
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <GoogleSigninButton
        accessibilityHint="accessibilityHint"
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signInWithGoogle}
      />

      <ButtonComponent title="Login" handleOnPress={() => handleUserLogin()} />
    </View>
  );
};

export default LoginScreen;
