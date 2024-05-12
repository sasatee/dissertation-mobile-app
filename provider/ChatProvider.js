import { Chat, OverlayProvider } from "stream-chat-expo";
import { StreamChat } from "stream-chat";

import React, { useEffect, useState } from "react";
import { STREAM_PUBLIC } from "@env";
import { ActivityIndicator, View } from "react-native";
import useLoginState from "../hooks/UseLoginState";

const client = StreamChat.getInstance(STREAM_PUBLIC);

const ChatProvider = ({ children }) => {
  const decodedToken = useLoginState();
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
     console.log("USE EFFECT:",decodedToken)
    if (!decodedToken) {
      return;
    }
    const connect = async () => {
      await client.connectUser(
        {
          id: decodedToken?.userId,
          name: `${decodedToken?.firstname} ${decodedToken?.lastname}`,
          image: decodedToken?.profilePicture,
        },
        client.devToken(decodedToken?.userId)
      );
      setIsReady(true);
    };
    connect();

    return () => {
      //clear the connection from stream sdk when  the chat provider component unmount
      if (isReady) {
        client.disconnectUser();
       
      }
       setIsReady(false);
    };
  }, [decodedToken?.userId]);

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
