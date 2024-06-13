import { STREAM_PUBLIC } from "@env";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import useLoginState from "../hooks/UseLoginState";
import { getUserProfileById } from "../services/profile";
import { getStreamToken } from "../services/stream";

const client = StreamChat.getInstance(STREAM_PUBLIC);

const ChatProvider = ({ children }) => {
  const decodedToken = useLoginState();

  const { data: profile } = useQuery({
    queryKey: ["profile", { id: decodedToken?.userId }],

    queryFn: ({ signal }) =>
      getUserProfileById({ signal, id: decodedToken?.userId }),
    enabled: !!decodedToken?.userId,
  });

  const { data: streamToken } = useQuery({
    queryFn: getStreamToken,
    queryKey: ["Stream"],

    // enabled: !!streamToken
  });

  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!profile) {
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
            id: profile?._id,
            name: `${profile?.firstName} ${profile?.lastName}`,
            image: profile?.profilePicture,
          },
          streamToken
        );
        //console.log(client.devToken(profile?._id));
        setIsReady(true);
      } catch (error) {
        setError(error.message);
        console.log(error);
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
  }, [profile?._id]);

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
