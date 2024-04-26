import React from "react";
import { Text, View } from "react-native";
import { useGetAllAppointments } from "../hooks/UseAppointment";

import { useSelector } from "react-redux";
import { checkIsDoctorLogin } from "../redux/slice/authenticationSlice";


const JWTScreen = ({ route }) => {
  const id = route.params;
  console.log(id);

  const {
    appointments,
    loading: appointmentsLoading,
    error: appointmentsError,
  } = useGetAllAppointments();
  //const is = useSelector((state) => state.auth.isDoctor);
  const isDoctor = useSelector(checkIsDoctorLogin);
  console.log("useSelector", isDoctor);

  if (appointmentsLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", flexDirection: "column" }}
      >
        {isDoctor === "true" && <Text>loading.....</Text>}
      </View>
    );
  }

  if (appointmentsError) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", flexDirection: "column" }}
      >
        <Text>Error: {appointmentsError.message}</Text>
      </View>
    );
  }
  return (
    <View
      style={{ flex: 1, justifyContent: "center", flexDirection: "column" }}
    >
      <Text>{JSON.stringify(appointments)}</Text>
    </View>
  );
};

export default JWTScreen;
