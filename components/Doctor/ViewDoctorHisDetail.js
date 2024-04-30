import {
  TouchableOpacity,
  Image,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { getSingleDoctor } from "../../services/doctor";
import { useQuery } from "@tanstack/react-query";

export default function ViewDoctorDetail({ route }) {
  const paramsId = route.params;

  const { data, isLoading } = useQuery({
    queryKey: ["doctors", { id: paramsId }],
    queryFn: ({ signal }) => getSingleDoctor({ signal, id: paramsId }),
  });
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
{/* <Text className= ></Text> */}
  if (data) {
    content = (
      <View className="bg-white/100 flex-1 py-6 ">
        <TouchableOpacity className="m-5 py-4">
          {data && (
            <Image
              source={{ uri: `${data?.doctor?.profilePicture}` }}
              className=" w-full h-56 rounded-2xl object-contain"
            />
          )}
        </TouchableOpacity>

        <View className="px-6">
          <TouchableOpacity>
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
