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
import CallProvider from "../provider/CallProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StripeProvider } from "@stripe/stripe-react-native";

import Constants from "expo-constants";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const { merchantIdentifier } = Constants.expoConfig.extra;

const MainNavigator = () => {
  const userLoginWithJWT = useSelector((state) => state.auth.token);

  const { user: userLoginWithGoogle } = useAuth();

  const isLoggedIn = userLoginWithJWT || userLoginWithGoogle;

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <SafeAreaProvider>
          <BottomSheetModalProvider>
            <StripeProvider publishableKey={merchantIdentifier}>
              <ChatProvider>
                <VideoProvider>
                  <CallProvider>
                    <BottomTabNavigation />
                  </CallProvider>
                </VideoProvider>
              </ChatProvider>
            </StripeProvider>
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      ) : (
        <AuthStackNavigation />
      )}
      <StatusBar backgroundColor={"purple"} />
    </NavigationContainer>
  );
};

export default MainNavigator;
