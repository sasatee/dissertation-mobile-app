import React from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getAllAppointment } from "../services/appointment";
import { format } from "date-fns";
import ViewProfileChat from "../components/Doctor/ViewDoctorProfileChat";

const ViewAllAppointment = () => {
  const { data } = useQuery({
    queryKey: ["Appointment"],
    queryFn: getAllAppointment,
  });

  const navigation = useNavigation();

  return (
    <>
      <ViewProfileChat />
      <View
        className="bg-white flex-1 rounded-t-3xl rou shadow-slate-700 saturate-150 "
        style={{
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
          top: 10,
          borderWidth: 1,
          borderColor: "white",
        }}
      >
        <FlatList
          data={data}
          renderItem={({ item }) => {
            //console.log(item.bookedTime,item.bookedTimeAMOrPM);
            return (
              <TouchableOpacity className="my-3 px-5 ">
                <View className="bg-gray-200/40 rounded-3xl  border-r-2">
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
                        {format(new Date(item.bookedTime), " dd MMMM yyyy")}
                      </Text>

                      <Text className="text-xs font-light">
                        Time Booked:
                        <Text className="font-semibold text-xs items-end text-amber-800">
                          {item.bookedTimeAMOrPM}
                        </Text>
                      </Text>

                      <View className=" my-5">
                        <Text className="right-20 font-mulishextrabold text-xs">
                          {item.doctorName}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default ViewAllAppointment;
