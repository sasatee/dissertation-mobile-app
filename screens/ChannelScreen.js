import { View, Text } from "react-native";
import React, { useState } from "react";
import { ChannelList } from "stream-chat-expo";
import useLoginState from "../hooks/UseLoginState";

export default function ChannelScreen({ navigation }) {
  const decodedToken = useLoginState();

  const handleNavigationAndCid = (channel) => {
    if (channel && channel.data && channel.data.cid) {
      navigation.navigate("Channel", channel.data.cid);
    } else {
      console.error("Channel or channel data is undefined.");
    }
  };

  return (
    <ChannelList
      filters={{ members: { $in: [decodedToken?.userId] } }}
      onSelect={(channel) => handleNavigationAndCid(channel)}
    />
  );
}
