import React, { useEffect, useState } from "react";
import { View, Alert, Pressable, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useGoogle";

import {
  logoutJwtToken,
  selectCurrentGoogleAccessToken,
  selectCurrentJwtToken,
} from "../redux/slice/authenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../Components/Button";
import { useGetAllAppointmentQuery } from "../services/appointment";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const { logout, user } = useAuth();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectCurrentJwtToken);
  const isLoggedWithGoogle = useSelector(selectCurrentGoogleAccessToken);



  const handleLogout = async () => {
    try {
      await ReactNativeAsyncStorage.removeItem("jwtToken");
      console.log("JWT Token removed");
      dispatch(logoutJwtToken());
    } catch (error) {
      console.error("Logout failed", error);
      Alert.alert("Logout Failed", "Please try again.");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ButtonComponent
        title="Open Chat Screen"
        handleOnPress={() => console.log(data?.appointments[0].reason)}
      />
      {isLoggedWithGoogle && user && user.photoURL && (
        <Pressable onPress={logout}>
          <Image
            className="h-10 w-10 rounded-full"
            source={{ uri: user.photoURL }}
          />
        </Pressable>
      )}

      {isLoggedIn ? (
        <ButtonComponent
          title={"Logout with JWT"}
          handleOnPress={handleLogout}
        />
      ) : null}
      <View>
        <ButtonComponent
          title="Navigate to jwt cehck"
          handleOnPress={() => navigation.navigate("Check")}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
