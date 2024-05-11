import { Chat, OverlayProvider } from "stream-chat-expo";
import { StreamChat } from "stream-chat";

import React, { useEffect, useState } from "react";
import { STREAM_PUBLIC } from "@env";
import { ActivityIndicator, View } from "react-native";

const client = StreamChat.getInstance(STREAM_PUBLIC);

const ChatProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
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
      setIsReady(true);
    };
    connect();

    return ()=>{
      //clear the connection from stream sdk when unmount the chat provider
      client.disconnectUser();
      setIsReady(false)
    }
  }, []);

  if (!isReady) {
    return (
      <View classname="flex-1 items-center">
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};

export default ChatProvider;
