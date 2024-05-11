import { NavigationContainer } from "@react-navigation/native";

import React from "react";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useGoogle";

import AuthStackNavigation from "./AuthStackNavigator";
import BottomTabNavigation from "./TabNavigator";

import ChatProvider from "../provider/ChatProvider";




const MainNavigator = () => {
  const userLoginWithJWT = useSelector((state) => state.auth.token);

  const { user: userLoginWithGoogle } = useAuth();

  const isLoggedIn = userLoginWithJWT || userLoginWithGoogle;

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <ChatProvider>
          <BottomTabNavigation />
        </ChatProvider>
      ) : (
        <AuthStackNavigation />
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
