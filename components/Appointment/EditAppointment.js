import moment from "moment";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { updateAppointment } from "../../services/appointment";
import { useMutation } from "@tanstack/react-query";
import ButtonComponent from "../CustomComponent/Button";

const UpdateAppointmentWithBottomSheet = ({ route }) => {
  const appointmentByID = route; // Ensure appointmentByID is passed through route params

  const [next7Days, setNext7Days] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [timeList, setTimeList] = useState();

  //react query

  const { mutate, isPending } = useMutation({
    mutationFn: updateAppointment({ appointmentByID }),
    onMutate: async (newData) => {
      // console.log("DATA passed: ", newData);

      await queryClient.cancelQueries({
        queryKey: ["Appointment", appointmentByID],
      });
      const previousAppointment = queryClient.getQueryData([
        "Appointment",
        appointmentByID,
      ]);

      queryClient.setQueryData(["Appointment", appointmentByID], newData);

      return { previousAppointment };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(
        ["Appointment", appointmentByID],
        context.previousAppointment
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["Appointment"]);
    },
  });

  useEffect(() => {
    getDays();
    getTime();
  }, []);

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

  const getUpdatedBookedTime = (date, time) => {
    if (!date || !time) return null;
    const [timePart, meridiem] = time.split(" ");
    const [hour, minute] = timePart.split(":");
    let hour24 = parseInt(hour);
    if (meridiem === "PM" && hour24 !== 12) hour24 += 12;
    if (meridiem === "AM" && hour24 === 12) hour24 = 0;
    const dateMoment = moment(date);
    dateMoment.hours(hour24).minutes(minute);
    return dateMoment.toISOString();
  };

  //
  const bookedTime = getUpdatedBookedTime(selectedDate, selectedTime);

  const updateAppointmentbyId = () => {
    if (!bookedTime) return;
    mutate({
      bookedTime,
      bookedTimeAMOrPM: selectedDate,
    });
  };

  //

  return (
    <View className="">
      <Text
        style={{ marginBottom: 20 }}
        className="text-lg font-medium text-slate-800 text-center"
      >
        Update Appointment
      </Text>

      <View className="px-6 mb-1">
        <Text className="text-md font-mono text-gray-500">Day</Text>
      </View>

      {/* list of date  */}
      <FlatList
        data={next7Days}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="px-6 mb-2">
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
      <View className="px-6 mb-2">
        <Text className="text-md font-mono text-gray-500 ">Time</Text>
      </View>

      {/* list of of time */}
      <FlatList
        data={timeList}
        horizontal
        //scrollEnabled
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
      <ButtonComponent
        className="w-full bg-blue-700/70 p-3 rounded-2xl mb-3 border-y-black"
        handleOnPress={updateAppointmentbyId}
      >
        <View className=" justify-center items-center">
          {isPending ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-xl font-mulishsemibold text-white text-center">
              Update Appointment
            </Text>
          )}
        </View>
      </ButtonComponent>
    </View>
  );
};

export default UpdateAppointmentWithBottomSheet;
