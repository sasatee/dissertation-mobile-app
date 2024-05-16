import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getAllDoctor } from "../../services/doctor";
import { useChatContext } from "stream-chat-expo";
import useLoginState from "../../hooks/UseLoginState";

// Dummy data for doctors
// const dummyData = Array.from({ length: 20 }, (_, index) => ({
//   id: index + 1,
//   firstName: `Doctor${index + 1}`,
//   lastName: `Doe${index + 1}`,
//   profilePicture: `https://via.placeholder.com/150/FFFFFF/CCBBFFCC/?text=Doctor${
//     index + 1
//   }`,
// }));

const ViewProfileChat = () => {
  const { client } = useChatContext();
  const decodedToken = useLoginState();

  const navigation = useNavigation();

  const { data, isError, isLoading, fetchStatus, isFetching, error } = useQuery(
    {
      queryKey: ["doctors"],
      queryFn: getAllDoctor,
      staleTime: 5000,
      // gcTime:100,
    }
  );

  const beginToChat = async (doctorId) => {
    //start a chat with him/doctor
    const channel = client.channel("messaging", {
      members: [decodedToken?.userId, doctorId],
    });
    await channel.watch();
    navigation.navigate("Chat", channel.id);
  };
  // const data = dummyData;
  let content;

  if (!data) {
    content = (
      <View className="bg-white/80 flex-1 ">
        <View className="flex-1 justify-center flex-row p-8">
          <Text className="text-center">
            <ActivityIndicator size="large" color="blue" />;
          </Text>
        </View>
      </View>
    );
  } else {
    content = (
      <View
        className=" bg-slate-700/75 transition-shadow py-4 shadow-2xl"
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderWidth: 1,
          borderColor: "white",
        }}
      >
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => beginToChat(item.doctorId)}
              className=" shadow-2xl rounded-lg mx-2"
            >
              <Image
                source={{ uri: `${item.profilePicture}` }}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: "cover",
                }}
                className="rounded-3xl"
              />

              <View className="">
                <Text className="text-center text-md  text-gray-300 font-mulishextrabold ">
                  {item.firstName}
                </Text>
                <Text className="text-center text-xs text-gray-400 font-mono ">
                  {item.lastName}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id.toString()}
          horizontal={true} // Set to true for horizontal scroll
          showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
          contentContainerStyle={{ paddingHorizontal: 15 }} // Add horizontal padding
        />
      </View>
    );
  }
  return <>{content}</>;
};

export default ViewProfileChat;
