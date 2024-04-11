import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ChatScreen from "../screens/ChatScreen";
import JWTScreen from "../screens/testScreen";
import { useSelector } from "react-redux";
const Stack = createStackNavigator();
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import useAuth from "../hooks/useGoogle";
const StackNavigator = () => {
  const reduxState = useSelector((state) => state.auth.token);   //for jwt

  const { user } = useAuth();  // custom hook google signin
  const isLoggedIn = reduxState || user;


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Chat" component={ChatScreen} />
              <Stack.Screen name="Check" component={JWTScreen} />
            </Stack.Group>
          </>
        ) : (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
