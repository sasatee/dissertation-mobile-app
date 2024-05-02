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
    <View className="bg-white px-4 flex-1 pt-9 ">
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => console.log("test")}
            className=" rounded-lg my-4 mx-2 "
          >
            <View className="bg-gray-300 rounded-lg space-x-3">
              <View className="flex items-end">
                <Image
                  source={{
                    uri: `${item.profilePicture}`,
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: "center",
                    borderRadius: 25,
                  }}
                  className="rounded-3xl m-3"
                />
              </View>

              <View className="flex flex-col items-start ">
                <Text>{format(new Date(item.bookedTime), "MMMM do yyyy")}</Text>
                <Text>{format(new Date(item.bookedTime), "h:mm:ss a")}</Text>
                <Text>{item.bookedTimeAMOrPM}</Text>
                <Text>{item.reason}</Text>
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
