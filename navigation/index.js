import { NavigationContainer } from "@react-navigation/native";

import React from "react";
import { useSelector } from "react-redux";
import useAuth from "../provider/GoogleProvider";

import AuthStackNavigation from "./AuthStackNavigator";
import BottomTabNavigation from "./TabNavigator";

import ChatProvider from "../provider/ChatProvider";
import { StatusBar } from "react-native";
import useLoginState from "../hooks/UseLoginState";
import VideoProvider from "../provider/VideoProvider";

const MainNavigator = () => {
  const userLoginWithJWT = useSelector((state) => state.auth.token);

  //const check = useLoginState();

  const { user: userLoginWithGoogle } = useAuth();

  const isLoggedIn = userLoginWithJWT || userLoginWithGoogle;

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <ChatProvider>
          <VideoProvider>
            <BottomTabNavigation />
          </VideoProvider>
        </ChatProvider>
      ) : (
        <AuthStackNavigation />
      )}
      <StatusBar backgroundColor={"purple"} />
    </NavigationContainer>
  );
};

export default MainNavigator;
