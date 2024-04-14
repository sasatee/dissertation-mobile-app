import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ChatScreen from "./screens/ChatScreen";
import useAuth from "./hooks/useGoogleSigninHook";
import { useDispatch, useSelector } from "react-redux";
import JWTScreen from "./screens/testScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();

  const reduxState = useSelector((state) => state.auth.token);
  // console.log(user,isLoggedIn)
  const isLoginedIn = reduxState || user;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoginedIn ? (
        <>
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Check" component={JWTScreen} />
          </Stack.Group>
          {/* <Stack.Screen name="Login" component={LoginScreen} options={{presentation: 'modal'}} /> */}
        </>
      ) : (
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
