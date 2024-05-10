import React from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getAllAppointment } from "../services/appointment";
import { format } from "date-fns";

const ViewAllAppointment = () => {
  const { data } = useQuery({
    queryKey: ["Appointment"],
    queryFn: getAllAppointment,
  });

  const navigation = useNavigation();

  return (
    <View className="bg-white/80 px-4 flex-1 pt-9 ">
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => console.log("test")}
            className=" rounded-lg my-4 mx-2 "
          >
            <View className="bg-gray-500/5 rounded-lg space-y-2  border-r-2 border-spacing-y-3.5">
              <View className="flex  flex-row">
                <Image
                  source={{
                    uri: `${item?.profilePicture}`,
                  }}
                  style={{
                    //margin:3,
                    width: 50,
                    height: 50,
                    resizeMode: "cover",
                    borderRadius: 20,
                  }}
                  className="rounded-3xl m-3"
                />
                <View className="flex-1 flex-col justify-center items-start pl-4">
                  <Text className="text-xs self-end p-3 text-gray-500">
                    {format(new Date(item.bookedTime), "MMMM do yyyy")}
                  </Text>

                  <Text className="text-xs font-light">
                    Time Booked:
                    <Text className="font-semibold text-xs items-end text-amber-800">
                      {item.bookedTimeAMOrPM}
                    </Text>
                  </Text>

                  <View className=" my-5">
                    <Text className="right-20 font-mulishextrabold text-xs">{item.doctorName}</Text>
                  </View>
                </View>
              </View>

            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ViewAllAppointment;
