import {
  ActivityIndicator,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
} from "stream-chat-expo";
import useLoginState from "../hooks/UseLoginState";
import { useNavigation } from "@react-navigation/native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function ChannelScreen({ route }) {
  // console.log("ROUTE CHANNEL ID CHANNEL LIST SCREEN,", route.params);

  const navigation = useNavigation();
  const decodedToken = useLoginState();
  const [selectChannel, setSelectChannel] = useState(null);

  const onChannelPressed = (channel) => {
    setSelectChannel(channel);
  };

  const goBack = () => {
    setSelectChannel(null);
    navigation.navigate("Chat");
  };

  return (
    <>
      {selectChannel ? (
        <Channel
          className="flex-1"
          channel={selectChannel}
          // Message={(message) => {
          //   console.log(message);
          //   return <Text className="text-left">{message.message.text}</Text>;
          // }}
        >
          <View className="bg-white/75 pb-1">
            <TouchableOpacity onPress={goBack} className="m-1">
              <FontAwesome6
                name="arrow-right-to-bracket"
                size={20}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <MessageList />
          <MessageInput />
        </Channel>
      ) : (
        <ChannelList
          filters={{ members: { $in: [decodedToken?.userId] } }}
          onSelect={onChannelPressed}
        />
      )}
    </>
  );
}
