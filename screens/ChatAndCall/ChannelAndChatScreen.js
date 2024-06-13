import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  Channel,
  ChannelList,
  MessageInput,
  MessageList,
} from "stream-chat-expo";
import useLoginState from "../../hooks/UseLoginState";
import { useStreamVideoClient } from "@stream-io/video-react-native-sdk";

export default function ChannelScreen({ route }) {
  const navigation = useNavigation();
  const decodedToken = useLoginState();
  const [selectChannel, setSelectChannel] = useState(null);
  const VideoClient = useStreamVideoClient();

  const onChannelPressed = (channel) => {
    setSelectChannel(channel);
  };

  const goBack = () => {
    setSelectChannel(null);
    navigation.navigate("Chat");
  };

  const joincall = async () => {
    //create a call using the channel members
    const call = VideoClient.call("default", "123");
    await call.getOrCreate();
    console.log(call)

    navigation.navigate("Call");
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
          audioRecordingEnabled
        >
          <View className="bg-white/75 pb-1  flex-row justify-between">
            <View>
              <TouchableOpacity onPress={goBack} className="m-2">
                <FontAwesome6
                  name="arrow-right-to-bracket"
                  size={22}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity onPress={joincall} className="m-2">
                <Ionicons name="call" size={22} color="black" />
              </TouchableOpacity>
            </View>
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
