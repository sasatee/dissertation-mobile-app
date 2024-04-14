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

const JWTScreen = () => {
  const {
    appointments,
    loading: appointmentsLoading,
    error: appointmentsError,
  } = useGetAllAppointments();

  if (appointmentsLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", flexDirection: "column" }}
      >
        <Text>Loading... </Text>
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


}


// const JWTScreen =()=>{
//   return {

//   }
// }
 export default JWTScreen;

