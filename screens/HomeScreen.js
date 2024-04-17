import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Image, Pressable, View } from "react-native";
import useAuth from "../hooks/useGoogle";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../components/Button";
import {
  logoutJwtToken,
  selectCurrentGoogleAccessToken,
  selectCurrentJwtToken,
} from "../redux/slice/authenticationSlice";

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
