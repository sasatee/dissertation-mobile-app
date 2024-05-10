import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { bookAppointment } from "../../services/appointment";
import { queryClientfn } from "../../services/queryClient";
import ButtonComponent from "../CustomComponent/Button";

const BookAppointment = ({ route }) => {
  const [next7Days, setNext7Days] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [timeList, setTimeList] = useState();

  const [reason, setReason] = useState("");
  const navigation = useNavigation();

  const doctorID = route.params;

  const { mutate, isPending, error, isError, isSuccess } = useMutation({
    mutationFn: bookAppointment,
    gcTime:5000,
    onSuccess: () => {
      queryClientfn.invalidateQueries({ queryKey: ["Appointment"] });
      ToastAndroid.show("Appointment successfully book", ToastAndroid.SHORT);
      navigation.navigate("Appointment");
    },
    onError: () => {
      navigation.navigate("Home");
    },
  });


    if (isError) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }

  function handleMakeAppointment() {
    mutate({
      reason: reason,
      doctorId: doctorID,
      bookedTimeAMOrPM: selectedTime,
      bookedTime: selectedDate,
    });
  }

  useEffect(() => {
    getDays();
    getTime();
  }, []);

  const getDays = () => {
    const nextSevenDays = [];

    for (let i = 0; i < 7; i++) {
      const date = moment().add(i, "days");
      nextSevenDays.push({
        date: date,
        day: date.format("ddd"),
        formattedDate: date.format("Do MMM"),
      });
    }

    setNext7Days(nextSevenDays);
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 9; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }

    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeList(timeList);
    //console.log(timeList)
  };
  return (
    <>
      <View className="bg-white/100">
        <View className="px-6 mt-8">
          <Text className="text-lg font-semibold text-black">
            Book Appointment
          </Text>
        </View>

        {/* day heading to book */}
        <View className="px-6 mb-1">
          <Text className="text-md font-mono text-gray-500">Day</Text>
        </View>

        {/* list of date  */}
        <FlatList
          data={next7Days}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="px-6 mb-10">
              <TouchableOpacity
                className={
                  selectedDate === item.date
                    ? "bg-blue-700/70  border  border-gray-500 items-center -mr-10 px-4 rounded-2xl"
                    : `border  border-gray-500 items-center -mr-10 px-4 rounded-2xl`
                }
                onPress={() => setSelectedDate(item.date)}
              >
                <Text
                  className={
                    selectedDate === item.date
                      ? "font-bold text-white text-md"
                      : "font-semibold text-md"
                  }
                >
                  {item.day}
                </Text>
                <Text
                  className={
                    selectedDate === item.date
                      ? "font-mulishextrabold text-white text-xs"
                      : "font-mulishextrabold text-black/50 text-xs"
                  }
                >
                  {item.formattedDate}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <View className="px-6 mb-1">
          <Text className="text-md font-mono text-gray-500">Time</Text>
        </View>

        {/* list of of time */}
        <FlatList
          data={timeList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="px-6 mb-10">
              <TouchableOpacity
                className={
                  selectedTime === item.time
                    ? "bg-blue-700/70  border  border-gray-500 items-center -mr-10 px-4 rounded-2xl"
                    : `border  border-gray-500 items-center -mr-10 px-4 rounded-2xl`
                }
                onPress={() => setSelectedTime(item.time)}
              >
                <Text
                  className={
                    selectedTime === item.time
                      ? "font-bold text-white text-md"
                      : "font-semibold text-md"
                  }
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <View className="px-6 space-y-2">
          <Text className="text-md font-mono text-gray-500 left-2">Reason</Text>

          <TextInput
            numberOfLines={3}
            className="bg-gray-100 p-2 rounded-xl border-gray-500 mb-5"
            placeholder="Write Here"
            onChangeText={(value) => setReason(value)}
            value={reason}
          />
          <ButtonComponent
            className="w-full bg-blue-700/70 p-3 rounded-2xl mb-3 border-y-black"
            handleOnPress={handleMakeAppointment}
          >
            <View className=" justify-center items-center">
              {isPending ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-xl font-mulishsemibold text-white text-center">
                  Make Appointment
                </Text>
              )}
            </View>
          </ButtonComponent>
        </View>
      </View>
    </>
  );
};

export default BookAppointment;
