import React from "react";
import {  ScrollView } from "react-native";

import { useSelector } from "react-redux";
import { checkIsDoctorLogin } from "../redux/slice/authenticationSlice";

import { useQuery } from "@tanstack/react-query";
import ViewDoctorDetail from "../components/Doctor/ViewDoctorHisDetail";
import BookAppointment from "../components/Appointment/BookAppointmentSection";
const JWTScreen = ({ route }) => {
  const isDoctor = useSelector(checkIsDoctorLogin);
  console.log("isDoctor state set: ", isDoctor);

  let content;

  // if (isLoading) {
  //   content = (
  //     <View className="flex-1 justify-center flex-row p-8">
  //       <Text className="text-center">
  //         <ActivityIndicator size="large" color="blue" />;
  //       </Text>
  //     </View>
  //   );
  // }

  return (
    <>
      <ScrollView className='p-1 border-blue-900 border-solid'>
        <ViewDoctorDetail route={route} />
        <BookAppointment route={route}/>
      </ScrollView>
    </>
  );
};

export default JWTScreen;
