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

  // Fetch user profile
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useQuery({
    queryKey: ["profile", { id: decodedToken?.userId }],
    queryFn: ({ signal }) =>
      getUserProfileById({ signal, id: decodedToken?.userId }),
    enabled: !!decodedToken?.userId && !!decodedToken,
  });
  // console.log("Decoded Token:", decodedToken);
  // console.log("PROFILE:", profile);

  // Fetch Stream token
  const {
    data: streamToken,
    isLoading: tokenLoading,
    error: tokenError,
  } = useQuery({
    queryFn: getStreamToken,
    queryKey: ["Stream"],
    enabled: !!decodedToken?.userId,
  });
  //console.log("Stream Token:", streamToken);

  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ensure both profile and streamToken are available before attempting to connect
    if (profile && streamToken) {
      const connect = async () => {
        try {
          setIsLoading(true);
          // Disconnect previous user if already connected
          if (client.userID) {
            await client.disconnectUser();
          }
          // Connect the new user
          await client.connectUser(
            {
              id: profile._id,
              name: `${profile.firstName} ${profile.lastName}`,
              image: profile.profilePicture,
            },
            streamToken
          );
          setIsReady(true);
        } catch (error) {
          setError(error.message);
          console.error("Error connecting to Stream:", error);
        } finally {
          setIsLoading(false);
        }
      };

      connect();

      return () => {
        // Cleanup function
        if (client.userID) {
          client.disconnectUser();
        }
        setIsReady(false);
      };
    }
  }, [profile, streamToken]);

  if (profileLoading || tokenLoading || isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error || profileError || tokenError) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{error || profileError?.message || tokenError?.message}</Text>
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
