import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format, isValid } from "date-fns"; // Import isValid to check date validity
import React, { useRef, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid
} from "react-native";
import { useSelector } from "react-redux";
import DeleteConfirmationModal from "../../components/Appointment/DeleteAppointmetwithModal";
import UpdateAppointmentWithBottomSheet from "../../components/Appointment/EditAppointment";
import ViewProfileChat from "../../components/Doctor/ViewDoctorProfileChat";
import { checkIsDoctorLogin } from "../../redux/slice/authenticationSlice";
import apiClient from "../../services/apiClient";
import { getAllAppointment } from "../../services/appointment";
import Schedule from "./ScheduleAppointmentScreen";
import { queryClientfn } from "../../services/queryClient";

const ViewAllAppointment = () => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["Appointment"],
    queryFn: getAllAppointment,
  });
  const isDoctorTrue = useSelector(checkIsDoctorLogin);

  const navigation = useNavigation();

  //bottom component

  const [isOpen, isSetOpen] = useState(false);

  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentbyId, setAppointmentById] = useState(null);

  const BottomSheetModalRef = useRef(null);

  const snapPoints = ["25%", "50%"];
  function handlePressModalForUpdate(appointmentId) {
    BottomSheetModalRef.current?.present();
    setAppointmentById(appointmentId);

    isSetOpen(true);
  }

  //delete query
  

  const {
    mutate: deleteAppointment,
    isLoading: isMutationLoading,
     data: deleteappontment,
    isSuccess,
    error,
    submittedAt,
  } = useMutation({
    mutationFn: (newData) =>
      apiClient.delete(`api/v1/appointment/${newData._id}`),

    onSettled: () => {
      // Invalidate queries after mutation is settled
      queryClientfn.invalidateQueries(["Appointment"]);
      ToastAndroid.show("Delete Appointment successfully ", ToastAndroid.LONG);
    },

    onSuccess:()=>{
      ToastAndroid.show("Delete Appointment successfully ", ToastAndroid.LONG);
      ToastAndroid.show(deleteAppointment?.data?.msg, ToastAndroid.TOP);
      
    }
  });
  //console.log("DELETE APPOINTMENT", deleteappontment?.data?.msg, isSuccess);

  //

  const handleDeleteConfirmation = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDeleteModal(true);
  };

  const handleDeleteAppointment = () => {
    if (selectedAppointment && selectedAppointment._id) {
      //console.log("selectedAppointment", selectedAppointment._id);
      deleteAppointment({ _id: selectedAppointment._id });
    } else {
      console.error("No appointment selected for deletion");
    }
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    // Close the modal without deleting
    setShowDeleteModal(false);
  };

  //

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return isValid(date) ? format(date, "MM-dd-yyyy HH:mm") : "Invalid Date";
  };

  return (
    <>
      {isDoctorTrue ? (
        <>
          <View style={{ flex: 1, backgroundColor: "#FAF6F5" }}>
            <BottomSheetModal
              ref={BottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              backgroundStyle={{ borderRadius: 90 }}
          
              onDismiss={() => isSetOpen(false)}
            >
              <UpdateAppointmentWithBottomSheet route={appointmentbyId} />
            </BottomSheetModal>
            <FlatList
              data={data}
              refreshControl={
                <RefreshControl
                  refreshing={isFetching}
                  onRefresh={() => console.log("Refreshing...")}
                />
              }
              renderItem={({ item }) => {
                return (
                  <View
                    style={[
                      styles.container,
                      { backgroundColor: isOpen ? "#FFFFF7" : "white" },
                    ]}
                  >
                    {/* Card */}
                    <View style={styles.card} className="mx-3 py-2">
                      {isFetched ? (
                        <Text className="text-xs content-end text-right text-slate-500">
                          <Text>Updated at: </Text>
                          {formatDateTime(item.updatedAt)}
                        </Text>
                      ) : (
                        <Text className="text-xs content-end text-right text-slate-500">
                          <Text>Created at: </Text>
                          {formatDateTime(item.createdAt)}
                        </Text>
                      )}
                      {/* Header */}
                      <View style={styles.header}>
                        {/* ToDO "change image for user profile"*/}
                        <Image
                          style={styles.image}
                          source={{
                            uri: `${item?.profilePicture}`,
                          }}
                        />
                        {/* ToDO "change image for user profile"*/}

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
                            onPress={() => handlePressModalForUpdate(item._id)}
                          >
                            <Text style={styles.textButton}>Update</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.button}
                            className="bg-red-500"
                            onPress={() => console.log("Delete")}
                          >
                            <Text
                              style={styles.textButton}
                              onPress={() => handleDeleteConfirmation(item)}
                            >
                              Delete
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={true}
            />
            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
              <DeleteConfirmationModal
                onCancel={handleCancelDelete}
                onDelete={handleDeleteAppointment}
              />
            )}
          </View>
        </>
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
    flexDirection: "col",
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
