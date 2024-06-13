import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import {
  StreamVideoClient,
  StreamVideo,
} from "@stream-io/video-react-native-sdk";
import { STREAM_PUBLIC } from "@env";
import useLoginState from "../hooks/UseLoginState";
import { useQuery } from "@tanstack/react-query";
import { getUserProfileById } from "../services/profile";
import { getStreamToken } from "../services/stream";

const VideoProvider = ({ children }) => {
  const [VideoClient, setVideoClient] = useState(null);
  const decodedToken = useLoginState();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", { id: decodedToken?.userId }],
    queryFn: ({ signal }) =>
      getUserProfileById({ signal, id: decodedToken?.userId }),
    enabled: !!decodedToken?.userId, // Ensure the query runs only when the userId is available
  });

  const apiKey = STREAM_PUBLIC;
  const { data: token } = useQuery({
    queryFn: getStreamToken,
    queryKey: ["Stream"],
    // enabled: !!streamToken,
  });

  useEffect(() => {
    if (!profile) return;

    const initVideoClient = async () => {
      const userId = profile?._id;
      //console.log(userId)
      const user = {
        id: userId,
        name: `${profile?.firstName} ${profile?.lastName}`,
        image: profile?.profilePicture,
      };

      try {
        const client = new StreamVideoClient({
          apiKey,
          user,
          token,
        });

        setVideoClient(client);
      } catch (error) {
        console.error("Failed to initialize StreamVideoClient:", error);
      }
    };

    initVideoClient();

    return () => {
      if (VideoClient) {
        VideoClient.disconnectUser();
      }
    };
  }, [profile?._id]); // Ensure dependencies are correct

  if (!VideoClient || isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return <StreamVideo client={VideoClient}>{children}</StreamVideo>;
};

export default VideoProvider;
