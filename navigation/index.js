import { NavigationContainer } from "@react-navigation/native";

import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useGoogle";
import { Chat, OverlayProvider } from 'stream-chat-expo';
import { StreamChat } from "stream-chat";

import AuthStackNavigation from "./AuthStackNavigator";
import BottomTabNavigation from "./TabNavigator";

const client = StreamChat.getInstance("ww27wq4z9r3u");
const MainNavigator = () => {
  const userLoginWithJWT = useSelector((state) => state.auth.token);

  const { user: userLoginWithGoogle } = useAuth();

  const isLoggedIn = userLoginWithJWT || userLoginWithGoogle;

  useEffect(() => {
    const connect = async () => {
      //   const googleAccessToken = await ReactNativeAsyncStorage.getItem(
      //     "googleAccessToken"
      //   );
      //   const token = await ReactNativeAsyncStorage.getItem("jwtToken");

      await client.connectUser(
        {
          id: "jlahey",
          name: "Jim Lahey",
          image: "https://i.imgur.com/fR9Jz14.png",
        },
        client.devToken("jlahey")
      );

      //   const channel = client.channel('messaging','the_park',{
      //     name:'The Park'
      //   })
      //   await channel.watch()
    };
    connect();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <OverlayProvider>
        <Chat client={client}>
          <BottomTabNavigation />
          </Chat>
        </OverlayProvider>
      ) : (
        <AuthStackNavigation />
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
