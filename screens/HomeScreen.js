import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import filter from "lodash.filter";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import useAuth from "../provider/GoogleProvider";

import FeatherIcon from "react-native-vector-icons/Feather";
import Rating from "../components/CustomComponent/Rating";
import Slider from "../components/CustomComponent/Slider";
import useLoginState from "../hooks/UseLoginState";
import {
  logoutJwtToken,
  selectCurrentJwtToken,
} from "../redux/slice/authenticationSlice";
import { getAllDoctor } from "../services/doctor";
import ChatBot from "./Chatbot/ChatBot";

const HomeScreen = () => {
  const decodedToken = useLoginState();
  const { logout, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isLimited, setIsLimited] = useState(true); // New state to handle view limit

  const { data, isError, isLoading, fetchStatus, isFetching, error } = useQuery(
    {
      queryKey: ["doctors"],
      queryFn: getAllDoctor,
      staleTime: 5000,
    }
  );

  const contains = ({ firstName, lastName, specialization }, query) => {
    const formattedQuery = query.toLowerCase();
    return (
      (firstName && firstName.toLowerCase().includes(formattedQuery)) ||
      (lastName && lastName.toLowerCase().includes(formattedQuery)) ||
      (specialization && specialization.toLowerCase().includes(formattedQuery))
    );
  };

  function handleSearch(query) {
    setSearchQuery(query);
    const formattedQuery = query?.toLowerCase();
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
      //console.error("Logout failed", error);
      Alert.alert("Logout Failed", "Please try again.");
    }
  };

  const handleViewMore = () => {
    setIsLimited(false);
    navigation.navigate("Doctors"); // Add navigation to a full list screen
  };

  let contentForFlatlist = searchQuery === "" ? data : searchData;
  let limitedContent = contentForFlatlist?.slice(0, 3);

  return (
    <SafeAreaView className="bg-white/100 flex-1 pt-3">
      <View className="pr-8">
        <View style={styles.searchWrapper} className="flex-row">
          <View style={styles.search}>
            <View style={styles.searchIcon}>
              <FeatherIcon color="#848484" name="search" size={23} />
            </View>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(query) => handleSearch(query)}
              placeholder="Searching doctors.."
              placeholderTextColor="#848484"
              returnKeyType="done"
              style={styles.searchControl}
              value={searchQuery}
            />
          </View>
          <View className="m-1">
            {!!user && decodedToken && (
              <TouchableOpacity onPress={logout}>
                <Image
                  className="h-10 w-10 rounded-full"
                  source={{ uri: decodedToken?.profilePicture }}
                />
              </TouchableOpacity>
            )}
            {isLoggedIn && decodedToken ? (
              <TouchableOpacity onPress={handleLogout}>
                <Image
                  className="h-10 w-10 rounded-3xl"
                  source={
                    decodedToken?.profilePicture
                      ? { uri: decodedToken?.profilePicture }
                      : require("../assets/images/blank-head-profile-pic-for-a-man.jpg")
                  }
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
      <View className="mt-4">
        <FlatList
          data={limitedContent}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Booking", item._id)}
            >
              <View className="flex-row ml-5 mb-4">
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
        {contentForFlatlist?.length > 3 && (
          <TouchableOpacity onPress={handleViewMore}>
            <Text
              style={{
                color: "#007BFF",
                marginTop: 0,
                marginLeft: 3,
                alignSelf: "center",
              }}
            >
              View More
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View className="space-y-5 px-2">
        <TouchableOpacity onPress={() => navigation.navigate("profile1")}>
          <Text>View profile</Text>
        </TouchableOpacity>
      </View>
      <Rating />
      <Slider />
      <ChatBot />

     

   
   

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Search */
  search: {
    position: "relative",
    backgroundColor: "#efefef",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  searchWrapper: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#efefef",
  },
  searchIcon: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 34,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  searchControl: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    paddingLeft: 34,
    width: "100%",
    fontSize: 14,
    fontWeight: "500",
  },
  searchContent: {
    paddingLeft: 24,
  },
  searchEmpty: {
    textAlign: "center",
    paddingTop: 16,
    fontWeight: "500",
    fontSize: 15,
    color: "#9ca1ac",
  },
});

export default HomeScreen;
