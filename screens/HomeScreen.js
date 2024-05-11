import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import filter from "lodash.filter";
import React, { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useGoogle";
import {
  logoutJwtToken,
  selectCurrentJwtToken,
} from "../redux/slice/authenticationSlice";
import { getAllDoctor } from "../services/doctor";
// import useLoginState from "../hooks/UseLoginState";

//use


const HomeScreen = () => {
  const { logout, user } = useAuth();
    // const decodedToken = useLoginState();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);

  const { data, isError, isLoading, fetchStatus, isFetching, error } = useQuery(
    {
      queryKey: ["doctors"],
      queryFn: getAllDoctor,
      staleTime: 5000,
    }
  );

  const contains = ({ firstName, lastName, specialization }, query) => {
    const formattedQuery = query.toLowerCase();
    if (
      firstName.toLowerCase().includes(formattedQuery) ||
      lastName.toLowerCase().includes(formattedQuery) ||
      specialization.toLowerCase().includes(formattedQuery)
    ) {
      return true;
    }
    return false;
  };

  function handleSearch(query) {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    console.log(formattedQuery);
    const filteredData = filter(data, (item) => contains(item, formattedQuery));
    setSearchData(filteredData);
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

  let contentForFlatlist = searchQuery === "" ? data : searchData;

  return (
    <SafeAreaView className="bg-white/100 flex-1 pt-2">
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
            <Button
              className="h-10 w-10 rounded-3xl"
              //handleOnPress={()=>navigation.navigate("Modal")}
              onPress={handleLogout}
              title="logout"
            >
              <Text className="text-xs font-mulishsemibold text-white text-center">
                logout
              </Text>
            </Button>
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
        <FlatList
          data={contentForFlatlist}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Booking", item._id)}
            >
              <View className="flex-row items-center ml-3 mb-4">
                <Image
                  source={{ uri: item.profilePicture }}
                  className="h-10 w-10 rounded-xl"
                  style={{ resizeMode: "cover" }}
                />
                <View>
                  <Text className="font-bold ml-3 font-mulishsemibold">
                    {item.firstName} {item.lastName}
                  </Text>
                  <Text className="font-xs text-gray-400 font-mulishbold ml-3">
                    {item.specialization}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
