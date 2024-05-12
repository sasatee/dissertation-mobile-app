import { View, Text, FlatList } from "react-native";
import React from "react";
import ViewProfileChat from "../components/Doctor/ViewDoctorProfileChat";
import { useChatContext } from "stream-chat-expo";

const ProfileChatScreen = () => {
  const { client } = useChatContext();

  const onPress = () => {
    //start a chat with him
    const channel = client.channel("messaging");
  };
  return <ViewProfileChat />;
};

export default ProfileChatScreen;
