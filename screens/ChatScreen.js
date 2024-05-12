import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Channel,
  MessageInput,
  MessageList,
  useChatContext,
} from "stream-chat-expo";

const ChatScreen = ({ route }) => {
  const navigation = useNavigation();
  const initialCid = route.params;

  const { client } = useChatContext();

  const [cid, setCid] = useState(initialCid);
  console.log(cid)

  const [channel, setChannel] = useState(null);
  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        // Correctly formatted query using filters
        const filter = {
          type: "messaging", // Replace 'messaging' with your channel type
          id: cid, // Use the cid from state
          members: { $in: [client.user.id] }, // Ensure the user is a member of the channel
        };
        const channels = await client.queryChannels(filter);

        if (channels.length > 0) {
          setChannel(channels[0]);
        } else {
          console.error("Channel not found");
        }
      } catch (error) {
        console.error("Error fetching channel", error);
      }
    };

    fetchChannel();
  }, []);

  if (!channel) {
    return <ActivityIndicator color="blue" />;
  }

  return (
    <>
      <Channel className="flex-1" channel={channel}>
        <View className="bg-white/75 pb-1">
          <TouchableOpacity onPress={handleGoBack} className="m-1">
            <FontAwesome6
              name="arrow-right-to-bracket"
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <MessageList />
        <SafeAreaView edges={["bottom"]}>
          <MessageInput />
        </SafeAreaView>
      </Channel>
    </>
  );
};

export default ChatScreen;
