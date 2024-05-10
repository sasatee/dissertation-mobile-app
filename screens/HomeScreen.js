import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useAuth from "../hooks/useGoogle";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../components/CustomComponent/Button";
import {
  logoutJwtToken,
  selectCurrentJwtToken,
} from "../redux/slice/authenticationSlice";
import { useQuery } from "@tanstack/react-query";
import { getAllDoctor } from "../services/doctor";

const HomeScreen = () => {
  const { logout, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isError, isLoading, fetchStatus, isFetching, error } = useQuery(
    {
      queryKey: ["doctors"],
      queryFn: getAllDoctor,
      staleTime: 5000,
    }
  );

  function handleSearch(query) {
    setSearchQuery(query);
  }

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectCurrentJwtToken);

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

  let contentForFlatlist;

  if (data) {
    contentForFlatlist = (
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View className="flex-row items-center ml-3 mt-3">
            <Image
              source={{ uri: item.profilePicture }}
              className="h-10 w-10 rounded-2xl"
              style={{ resizeMode: "cover" }}
            />
            <View>
              <Text className="font-sm ml-3 font-mulishsemibold">
                {item.firstName} {item.lastName}
              </Text>
              <Text className="font-xs text-gray-400 font-mulishbold ml-3">
                {item.specialization}
              </Text>
            </View>
          </View>
        )}
      />
    );
  }

  return (
    <SafeAreaView className="flex-1 my-8">
      <View className="">
        <View className="self-end px-3">
          {user && user?.photoURL && (
            <TouchableOpacity onPress={logout}>
              <Image
                className="h-10 w-10 rounded-full"
                source={{ uri: user.photoURL }}
              />
            </TouchableOpacity>
          )}
          {isLoggedIn ? (
            <ButtonComponent
              className="w-full bg-sky-400 p-1 rounded-2xl mb-3"
              handleOnPress={handleLogout}
            >
              <Text className="text-xl font-mulishsemibold text-white text-center">
                logout
              </Text>
            </ButtonComponent>
          ) : null}
        </View>
        <View className="px-4 -top-10">
          <View className="pr-10">
            <TextInput
              placeholder="search"
              clearButtonMode="always"
              autoCapitalize="none"
              autoCorrect={false}
              value={searchQuery}
              onChangeText={(query) => handleSearch(query)}
              className="border border-[#ccc] p-3 rounded-lg"
            />
          </View>
        </View>
        {contentForFlatlist}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
