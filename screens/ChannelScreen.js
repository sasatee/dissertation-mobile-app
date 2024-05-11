import { View, Text } from "react-native";
import React, { useState } from "react";
import { ChannelList } from "stream-chat-expo";

export default function ChannelScreen({ navigation }) {
  const [channel, setChannel] = useState();
 
  const handleNavigationAndCid = (channel) => {
    if (channel && channel.data && channel.data.cid) {
      setChannel(channel);
      navigation.navigate("Channel", channel.data.cid);
    } else {
      console.error("Channel or channel data is undefined.");
    }
  };

  return (
    <ChannelList onSelect={(channel) => handleNavigationAndCid(channel)} />
  );

}
