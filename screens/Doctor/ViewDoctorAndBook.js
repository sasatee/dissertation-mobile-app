import React from "react";
import { ScrollView } from "react-native";

import { useSelector } from "react-redux";
import { checkIsDoctorLogin } from "../../redux/slice/authenticationSlice";

import BookAppointment from "../../components/Appointment/BookAppointmentSection";
import ViewDoctorDetail from "../../components/Doctor/ViewDoctorHisDetail";
const JWTScreen = ({ route }) => {
  const isDoctor = useSelector(checkIsDoctorLogin);
  //console.log("isDoctor state set: ", isDoctor);

  return (
    <>
      <ScrollView className="p-1 border-blue-900 border-solid">
        <ViewDoctorDetail route={route} />
        <BookAppointment route={route} />
      </ScrollView>
    </>
  );
};

export default JWTScreen;
