import { View, Text } from "react-native";
import React, { useState } from "react";
import { ChannelList } from "stream-chat-expo";
import useLoginState from "../hooks/UseLoginState";
import { useNavigation } from "@react-navigation/native";

export default function ChannelScreen({ route }) {
  // console.log("ROUTE CHANNEL ID CHANNEL LIST SCREEEEN,", route.params);
  const navigation = useNavigation();
  const decodedToken = useLoginState();

  

  return (
    <ChannelList
      filters={{ members: { $in: [decodedToken?.userId] } }}
      onSelect={() => navigation.navigate("Chat", route.params)}
    />
  );
}
