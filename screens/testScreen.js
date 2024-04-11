import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Input from "../Components/Input";
import useYupValidation from "../hooks/useYupValidation";
import ButtonComponent from "../Components/Button";
import * as Yup from "yup";

const initialState = {
  email: 'sarvam',
  // password: ''
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
 // password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const JWTScreen = () => {
  const {
    value: emailValue,
    handleInputBlur: handleEmailBlur,
    handleInputChange: handleEmailOnChange,
    error: emailError,
    hasErr: emailHasError,
  } = useYupValidation(initialState, validationSchema);

  const {
    value: passwordValue,
    handleInputBlur: handlePasswordBlur,
    handleInputChange: handlePasswordOnChange,
    error: passwordError,
    hasErr: passwordHasError,
  } = useYupValidation("", validationSchema);

  function handleSubmit() {
    if (emailHasError ) {
      return;
    }
    console.log("http requests");
    console.log(emailValue, passwordValue);
  }

  return (
    <SafeAreaView className="my-20 mx-10">
      <Input
        placeholder="email"
        onChangeText={handleEmailOnChange}
        onBlur={handleEmailBlur}
      />
      {emailHasError && <Text style={styles.errorText}>{emailError}</Text>}
      {/* <Input
        placeholder="Password"
        onChangeText={handlePasswordOnChange}
        onBlur={handlePasswordBlur}
        secureTextEntry={true}
      />
      {passwordHasError && <Text style={styles.errorText}>{passwordError}</Text>} */}
      <View className="py-2">
        <ButtonComponent title="login" handleOnPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default JWTScreen;

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    marginTop: 5,
  },
});
