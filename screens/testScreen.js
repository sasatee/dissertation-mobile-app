import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Input from "../components/Input";
import useYupValidation from "../hooks/useYupValidation";
import ButtonComponent from "../components/Button";
import { useGetAllAppointments } from "../hooks/UseAppointment";
import {
  emailValidationSchema,
  passwordValidationSchema,
} from "../validation/auth";
import { checkIsDoctorLogin } from "../redux/slice/authenticationSlice";
import { useSelector } from "react-redux";

const JWTScreen = () => {
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
