import React, { useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getAllAppointment } from "../../services/appointment";
import { format, isValid } from "date-fns"; // Import isValid to check date validity
import ViewProfileChat from "../../components/Doctor/ViewDoctorProfileChat";
import { useSelector } from "react-redux";
import { checkIsDoctorLogin } from "../../redux/slice/authenticationSlice";
import Schedule from "./ScheduleAppointmentScreen";

const ViewAllAppointment = () => {

  const { data ,isFetching} = useQuery({
    queryKey: ["Appointment"],
    queryFn: getAllAppointment,
    onSuccess: () => {
      
    },
  });
  const isDoctorTrue = useSelector(checkIsDoctorLogin);

  const navigation = useNavigation();


  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return isValid(date) ? format(date, "MM-dd-yyyy HH:mm") : "Invalid Date";
  };

  return (
    <>
      {isDoctorTrue ? (
        <FlatList
          data={data}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => console.log("Refreshing...")}
            />
          }
          renderItem={({ item }) => {
            console.log(item);
            return (
              <View style={styles.container}>
                {/* Card */}
                <View style={styles.card} className="mx-3 py-2">
                  <Text className="text-xs content-end text-right text-slate-500">
                    <Text>Created at: </Text>
                    {formatDateTime(item.createdAt)}
                  </Text>
                  
                  {/* Header */}
                  <View style={styles.header}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: `${item?.profilePicture}`,
                      }}
                    />

                    <View>
                      <Text className="text-xs text-left text-slate-500">
                        {item?.userFullName}
                      </Text>
                      <Text className="text-xs text-sky-400">
                        Appointment at: {item?.bookedTimeAMOrPM}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        Gender: {item?.gender}
                      </Text>
                    </View>
                  </View>

                  {/* Content */}
                  <View style={styles.content}>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        className="bg-black"
                        onPress={() => console.log("Update")}
                      >
                        <Text style={styles.textButton}>Update</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.button}
                        className="bg-red-500"
                        onPress={() => console.log("Delete")}
                      >
                        <Text style={styles.textButton}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          showsVerticalScrollIndicator={true}
        />
      ) : (
        <>
          <ViewProfileChat />
          <Schedule />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "white",
    padding: 5,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 16,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    width: 350,
    height: 150,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  header: {
    marginBottom: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginRight: 10,
  },
  subtitle: {
    fontSize: 24,
    color: "#333",
  },
  content: {
    alignItems: "center",
    paddingTop: 5,
  },
  text: {
    fontSize: 17,
    color: "#444444",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 5,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "normal",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default ViewAllAppointment;
