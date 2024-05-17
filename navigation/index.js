import { NavigationContainer } from "@react-navigation/native";

import React from "react";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useGoogle";

import AuthStackNavigation from "./AuthStackNavigator";
import BottomTabNavigation from "./TabNavigator";

import ChatProvider from "../provider/ChatProvider";
import { StatusBar } from "react-native";
import useLoginState from "../hooks/UseLoginState";

const MainNavigator = () => {
  const userLoginWithJWT = useSelector((state) => state.auth.token);

  const check = useLoginState();

  const { user: userLoginWithGoogle } = useAuth();

  const isLoggedIn = userLoginWithJWT || userLoginWithGoogle;

  return (
    <NavigationContainer>
      {isLoggedIn && check ? (
        <ChatProvider>
          <BottomTabNavigation />
        </ChatProvider>
      ) : (
        <AuthStackNavigation />
      )}
      <StatusBar />
    </NavigationContainer>
  );
};

export default MainNavigator;
