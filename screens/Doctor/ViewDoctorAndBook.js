import React from "react";
import { ScrollView } from "react-native";


import BookAppointment from "../../components/Appointment/BookAppointment";
import ViewDoctorDetail from "../../components/Doctor/ViewDoctorHisDetail";
const CombineScreenViewDocAndBook = ({ route }) => {
  return (
    <>
      <ScrollView className="p-1 border-blue-900 border-solid">
        <ViewDoctorDetail route={route} />
        <BookAppointment route={route} />
      </ScrollView>
    </>
  );
};

export default CombineScreenViewDocAndBook;
