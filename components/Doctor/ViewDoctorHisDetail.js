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
import Rating from "../CustomComponent/Rating";

export default function ViewDoctorDetail({ route }) {
  const paramsId = route.params;
  const { client } = useChatContext();
  const decodedToken = useLoginState();
  const navigation = useNavigation();

  const { data, isLoading } = useQuery({
    queryKey: ["doctors", { id: paramsId }],
    queryFn: ({ signal }) => getSingleDoctor({ signal, id: paramsId }),
  });

  const beginToChat = async (doctorId) => {
    //start a chat with him/doctor
    const channel = client.channel("messaging", {
      members: [data?.doctor?.doctorId],
    });
    await channel.watch();
    navigation.navigate("Chat", channel.id);
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

          <View className="items-start flex-1">
            <View className="mb-5">
              <Text className="tex-md text-black">
                consultation fees:{" "}
                <Text className="text-blue-400">$ {data?.doctor?.price}</Text>{" "}
              </Text>
              
            </View>
          </View>
          

          <View className="mt-">
          
          <Rating isDisabled={false} size={20} />
            <Text className=" text-sm/tight text-gray-500">
              {data?.doctor?.description}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return <>{content}</>;
}
