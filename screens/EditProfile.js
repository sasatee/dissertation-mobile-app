import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import {
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
  useChatContext,
} from "stream-chat-expo";
import useLoginState from "../hooks/UseLoginState";

const ModalScreen = ({ route }) => {
  const { client } = useChatContext();

  const params = route.params;
  const [channel, setChannel] = useState(null);
  console.log(channel);

  useEffect(() => {
    const fetchChannel = async () => {
      // Correctly formatted query using filters
      // const filter = { type: "messaging", members: { $in: ["sarvam seetohul"] } };
      // const sort = [{ last_message_at: -1 }];

      const channels = await chatClient.queryChannels(params);
      setChannel(channels[0]);
    };
    fetchChannel();
  }, [params]);

  return (
    <Text>dsfsfsfsfs</Text>
    // <Channel>
    //   <MessageList />
    //   <MessageInput />
    // </Channel>
  );
};

export default ModalScreen;
