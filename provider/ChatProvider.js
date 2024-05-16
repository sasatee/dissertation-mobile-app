import { Chat, OverlayProvider } from "stream-chat-expo";
import { StreamChat } from "stream-chat";
import React, { useEffect, useState } from "react";
import { STREAM_PUBLIC } from "@env";
import { ActivityIndicator, View, Text } from "react-native";
import useLoginState from "../hooks/UseLoginState";

const client = StreamChat.getInstance(STREAM_PUBLIC);

const ChatProvider = ({ children }) => {
  const decodedToken = useLoginState();
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!decodedToken) {
      setIsLoading(true);
      return;
    }

    const connect = async () => {
      try {
        // Disconnect the previous user if already connected
        if (client.user) {
          await client.disconnectUser();
        }

        // Connect as the new user
        await client.connectUser(
          {
            id: decodedToken?.userId,
            name: `${decodedToken?.firstname} ${decodedToken?.lastname}`,
            image: decodedToken?.profilePicture,
          },
          client.devToken(decodedToken?.userId)
        );
        setIsReady(true);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    connect();

    return () => {
      if (isReady) {
        client.disconnectUser();
      }
      setIsReady(false);
    };
  }, [decodedToken?.userId]);

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color="blue" />
      </View>
    );
  }

  if (!isReady) {
    return null;
  }

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};

export default ChatProvider;

