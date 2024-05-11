import { View, Text, ActivityIndicator, Button, Touchable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useChatContext } from "stream-chat-expo";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const ChatScreen = ({ route }) => {
  const navigation = useNavigation();
  const cid = route.params;
  const { client } = useChatContext();
  const [channel, setChannel] = useState();

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchChannel = async () => {
      const channel = await client.queryChannels({ cid });
      if (channel && channel.length > 0) {
        setChannel(channel[0]);
        // console.log("CID from Retrieved Array:", channel[0].cid);
      }
    };
    fetchChannel();
  }, [cid]);
  if (!channel) {
    return <ActivityIndicator />;
  }
  return (
    <>
      <Channel className="flex-1" channel={channel}>
        <View className="bg-white/75 pb-1 flex">
        <TouchableOpacity onPress={handleGoBack} className='m-1'>
           <FontAwesome6 name="arrow-right-to-bracket" size={20} color="black" />
        </TouchableOpacity>
        </View>
        <MessageList />
        <MessageInput />
      </Channel>
    </>
  );
};

export default ChatScreen;
