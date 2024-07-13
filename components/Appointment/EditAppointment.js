
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, ActivityIndicator,ToastAndroid } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { updateAppointment } from "../../services/appointment";
import { useMutation } from "@tanstack/react-query";
import ButtonComponent from "../CustomComponent/Button";
import apiClient from "../../services/apiClient"; // Update import statement
import { queryClientfn } from "../../services/queryClient";

const UpdateAppointmentWithBottomSheet = ({ route }) => {
  const appointmentByID = route; // Ensure appointmentByID is passed through route params

  const [next7Days, setNext7Days] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [timeList, setTimeList] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

  const bookedTime = getUpdatedBookedTime(selectedDate, selectedTime);
  const {
    mutate: updateMutation,
    isLoading: isMutationLoading,
    data,
    error,
    submittedAt,
  } = useMutation({
    mutationFn: (newData) =>
      apiClient.patch(`api/v1/appointment/${appointmentByID}`, newData),
    onMutate: async (newData) => {
      // Optimistically update local cache
      await queryClientfn.cancelQueries({
        queryKey: ["Appointment", appointmentByID],
      });
      const previousAppointment = queryClientfn.getQueryData([
        "Appointment",
        appointmentByID,
      ]);

      queryClientfn.setQueryData(["Appointment", appointmentByID], newData);

      return { previousAppointment };
    },
    onError: (error, newData, context) => {
      // Rollback to previous data on error
      queryClientfn.setQueryData(
        ["Appointment", appointmentByID],
        context.previousAppointment
      );
    },
    onSettled: () => {
    
      queryClientfn.invalidateQueries(["Appointment"]);
      ToastAndroid.show("Update Appointment successfully ", ToastAndroid.SHORT);
    },
  });
  // console.log("data for appointment updated", data?.data?.appointment);
  const updateAppointmentbyId = async () => {
    if (!bookedTime) return;

    setIsLoading(true);

    try {
      const newData = {
        bookedTime,
        bookedTimeAMOrPM: selectedTime,
        // doctorName: "Dr. Example",
        gender: "male",
        durationMinutes: 30,
        createdAt: bookedTime,
      };

      // Call mutation function with newData
      updateMutation(newData);
    } catch (error) {
      console.error("Error updating appointment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="m-4" >
      <Text
        style={{
          marginBottom: 20,
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Update Appointment
      </Text>

      <View style={{ paddingHorizontal: 6, marginBottom: 10 }}>
        <Text style={{ fontSize: 16, color: "#888" }}>Day</Text>
      </View>

      <FlatList
        data={next7Days}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 6, marginBottom: 20 }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "#888",
                alignItems: "center",
                padding: 10,
                borderRadius: 15,
                backgroundColor:
                  selectedDate === item.date ? "#3399FF" : "#FFF",
              }}
              onPress={() => setSelectedDate(item.date)}
            >
              <Text
                style={{
                  fontWeight: selectedDate === item.date ? "bold" : "normal",
                  color: selectedDate === item.date ? "#FFF" : "#333",
                  fontSize: 16,
                }}
              >
                {item.day}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: selectedDate === item.date ? "#FFF" : "#333",
                  fontSize: 12,
                }}
              >
                {item.formattedDate}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={{ paddingHorizontal: 6, marginBottom: 10 }}>
        <Text style={{ fontSize: 16, color: "#888" }}>Time</Text>
      </View>

      <FlatList
        data={timeList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 6, marginBottom: 20 }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "#888",
                alignItems: "center",
                padding: 10,
                borderRadius: 15,
                backgroundColor:
                  selectedTime === item.time ? "#3399FF" : "#FFF",
              }}
              onPress={() => setSelectedTime(item.time)}
            >
              <Text
                style={{
                  fontWeight: selectedTime === item.time ? "bold" : "normal",
                  color: selectedTime === item.time ? "#FFF" : "#333",
                  fontSize: 16,
                }}
              >
                {item.time}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <ButtonComponent
        style={{
          backgroundColor: "#3399FF",
          padding: 12,
          borderRadius: 20,
          marginTop: 20,
        }}
        handleOnPress={updateAppointmentbyId}
      >
        <View style={{ alignItems: "center" }}>
          {isMutationLoading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFF" }}>
              Update Appointment
            </Text>
          )}
        </View>
      </ButtonComponent>
    </View>
  );
};

export default UpdateAppointmentWithBottomSheet;
