import { Chat, OverlayProvider } from "stream-chat-expo";
import { StreamChat } from "stream-chat";
import React, { useEffect, useState } from "react";
import { STREAM_PUBLIC } from "@env";
import { ActivityIndicator, View, Text } from "react-native";
import useLoginState, { useToken } from "../hooks/UseLoginState";
import { useSelector } from "react-redux";
import {
  selectCurrentGoogleAccessToken,
  selectCurrentJwtToken,
} from "../redux/slice/authenticationSlice";
import { useQuery } from "@tanstack/react-query";
import { getUserProfileById } from "../services/profile";

const client = StreamChat.getInstance(STREAM_PUBLIC);

const ChatProvider = ({ children }) => {
  const decodedToken = useLoginState();

  const { data } = useQuery({
    queryKey: ["profile", { id: decodedToken?.userId }],

    queryFn: ({ signal }) =>
      getUserProfileById({ signal, id: decodedToken?.userId }),
  });

  //console.log(data)
 

  const jwt = useSelector(selectCurrentJwtToken);
  const google = useSelector(selectCurrentGoogleAccessToken);

  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!data) {
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
            id: data?._id,
            name: `${data?.firstName} ${data?.lastName}`,
            image: data?.profilePicture,
          },
          client.devToken(data?._id)
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
  }, [data]);

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
