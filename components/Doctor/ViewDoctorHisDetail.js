import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getSingleDoctor } from "../../services/doctor";
import { AntDesign } from "@expo/vector-icons";
import { useChatContext } from "stream-chat-expo";
import useLoginState from "../../hooks/UseLoginState";
import { useNavigation } from "@react-navigation/native";

export default function ViewDoctorDetail({ route }) {
  const paramsId = route.params;
  const { client } = useChatContext();
  const decodedToken = useLoginState();
  const navigation = useNavigation();

  const { data, isLoading } = useQuery({
    queryKey: ["doctors", { id: paramsId }],
    queryFn: ({ signal }) => getSingleDoctor({ signal, id: paramsId }),
  });

  const doctorId = data?.doctor?.doctorId;

  const beginToChat = async () => {
    //start a chat with him/doctor
    const channel = client.channel("messaging", {
      members: [decodedToken?.userId, doctorId],
    });
    await channel.watch();

     // Extract essential channel information


     navigation.navigate("ModalScreen", channel);
  };
  let content;

  if (isLoading) {
    content = (
      <View className="bg-white/100 flex-1">
        <View className="flex-1 justify-center flex-row p-8">
          <Text className="text-center">
            <ActivityIndicator size="large" color="blue" />;
          </Text>
        </View>
      </View>
    );
  }
  {
    /* <Text className= ></Text> */
  }
  if (data) {
    content = (
      <View className="bg-white/100 flex-1 py-1 ">
        <TouchableOpacity className="m-5 pt-2">
          {data && (
            <Image
              source={{ uri: `${data?.doctor?.profilePicture}` }}
              className=" w-full h-56 rounded-2xl object-contain"
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={beginToChat}
          className="flex-row justify-center"
        >
          <AntDesign name="message1" size={30} color="black" />
          <Text className="p-2">Start Chat</Text>
        </TouchableOpacity>

        <View className="px-6">
          <TouchableOpacity className="py-3">
            <Text className="text-lg font-semibold text-black">
              Find your personal{" "}
              <Text className="text-sky-500 text-xl text-clip">Doctor</Text>{" "}
              here
            </Text>
            <View className="my-3">
              <Text className=" text-black text-ellipsis font-medium">
                Dr.{" "}
                <Text className="text-sky-500 text-sm font-light">
                  {data?.doctor?.firstName}
                  {""} {data?.doctor?.lastName}
                </Text>
              </Text>
            </View>
          </TouchableOpacity>

          <Text className=" text-sm/tight text-gray-500">
            {data?.doctor?.description}
          </Text>
        </View>
      </View>
    );
  }

  return <>{content}</>;
}
