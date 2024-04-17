import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Platform,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import useAuth from "../hooks/useGoogle";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { signInUser } from "../redux/slice/authenticationSlice";

import Input from "../components/Input";
import useYupValidation from "../hooks/useYupValidation";
import ButtonComponent from "../components/Button";
import { setJwtToken, setIsDoctor } from "../redux/slice/authenticationSlice";

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

  // //JWT
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // const handleUserLogin = async () => {
  //   try {
  //     await dispatch(signInUser({ email, password }));
  //     const result = dispatch(signInUser({ email, password }));
  //     if (result.payload) {
  //       navigation.navigate("Home");
  //       dispatch(setJwtToken(result.payload.token));
  //     }
  //       else{
  //        Alert.alert("Login failed","Invalid credentials")
  //      }
  //   } catch (error) {
  //     Alert.alert("Invalid Crendentials", error.message);
  //   }
  // };

  const handleUserLogin = async () => {
    const userCredentials = {
      email: "sarvam@gmail.com",
      password: "secretpassword1@",
    };
    try {
      //const result = await dispatch(signInUser(userCredentials));
      //const result = await dispatch(signInUser({ email, password }).unwrap());
      dispatch(signInUser(userCredentials));

      // if (result.token) {
      //   dispatch(setIsDoctor({ user: { isDoctor: result.user.isDoctor } }));

      // }
    } catch (error) {
      Alert.alert("Invalid Credentials");
    }
  };

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

      <ButtonComponent title="login" handleOnPress={handleUserLogin} />

      <View className="py-2 justify-center items-center">
        <GoogleSigninButton
          accessibilityHint="accessibilityHint"
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInWithGoogle}
        />
        <View className="px-5 align-middle">
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text>Go to register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    // <ScrollView
    //   style={{ flex: 1, backgroundColor: "#ffffff" }}
    //   showsVerticalScrollIndicator={false}
    // >
    //   <KeyboardAvoidingView
    //     behavior={Platform.OS === "ios" ? "padding" : "height"}
    //     style={styles.container}
    //   >
    //     <ImageBackground
    //       source={require("../assets/background.jpg")}
    //       style={{ height: Dimensions.get("window").height / 3 }}
    //     ></ImageBackground>

    //     {/* bottom view */}
    //     <View style={styles.bottomView}>
    //       {/* welcome view */}

    //       <View style={{ padding: 40 }}>
    //         <Text style={{ color: "#4632A1", fontSize: 34 }}>Welcome</Text>
    //         <Text style={{ color: "red", fontStyle: "normal" }}>
    //           Admin Login
    //         </Text>

    //         {/* Form view */}
    //         <View style={{ marginTop: 10 }}>
    //           <Input
    //             style={styles.input}
    //             placeholder="Email"
    //             value={email}
    //             onChangeText={handleEmailChange}
    //             onBlur={handleEmailBlur}
    //           />
    //           {emailError ? (
    //             <Text style={styles.errorText}>{emailError}</Text>
    //           ) : null}

    //           <Input
    //             style={styles.input}
    //             placeholder="Password"
    //             value={password}
    //             onChangeText={handlePasswordChange}
    //             onBlur={handlePasswordBlur}
    //             secureTextEntry={true}
    //           />
    //           {passwordError ? (
    //             <Text style={styles.errorText}>{passwordError}</Text>
    //           ) : null}
    //           <View style={styles.btnContainer}>
    //             <ButtonComponent
    //               title="Login"
    //               disabled={!showtext}
    //               color="#841584"
    //               borderRadius={10}
    //               onPress={handleUserLogin}
    //             />

    //             {!showtext && <ActivityIndicator size="small" color="white" />}

    //             <View className="py-2 justify-center items-center">
    //               <GoogleSigninButton
    //                 accessibilityHint="accessibilityHint"
    //                 size={GoogleSigninButton.Size.Standard}
    //                 color={GoogleSigninButton.Color.Dark}
    //                 onPress={signInWithGoogle}
    //               />
    //             </View>
    //           </View>
    //         </View>
    //       </View>
    //     </View>
    //   </KeyboardAvoidingView>
    // </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    left: 16,
    //paddingTop: 0,
  },
  brandview: {
    flex: 1,
    //flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomView: {
    flex: 1,
    backgroundColor: "#ffffff",
    bottom: 80,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },
  input: {
    height: 30,
    borderColor: "#000000",
    borderBottomWidth: 0.3,
    marginBottom: 36,
  },
  container: {
    flex: 1,
  },
  btnContainer: {
    // backgroundColor: "white",
    marginTop: 40,
    borderRadius: 3,
  },
});
