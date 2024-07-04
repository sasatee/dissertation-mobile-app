import React, { useRef, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getAllAppointment } from "../../services/appointment";
import { format, isValid } from "date-fns"; // Import isValid to check date validity
import ViewProfileChat from "../../components/Doctor/ViewDoctorProfileChat";
import { useSelector } from "react-redux";
import { checkIsDoctorLogin } from "../../redux/slice/authenticationSlice";
import Schedule from "./ScheduleAppointmentScreen";
import { BottomSheetModal, BottomModalProvider } from "@gorhom/bottom-sheet";
import DeleteConfirmationModal from "./DeLeteAppointmentModal";
import UpdateAppointmentWithBottomSheet from "../../components/Appointment/BottomSheetComponentAppointment";

const ViewAllAppointment = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["Appointment"],
    queryFn: getAllAppointment,
    onSuccess: () => {},
  });
  const isDoctorTrue = useSelector(checkIsDoctorLogin);

  const navigation = useNavigation();

  //bottom component

  const [isOpen, isSetOpen] = useState(false);

  const BottomSheetModalRef = useRef(null);

  const snapPoints = ["25%", "50%"];
  function handlePressModalForUpdate() {
    BottomSheetModalRef.current?.present();

    isSetOpen(true);
  }

  //delete

  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleDeleteConfirmation = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDeleteModal(true);
  };

  const handleDeleteAppointment = () => {
    // Perform delete operation here
    console.log("Deleting appointment:", selectedAppointment);
    // Close the modal after deletion
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
          <BottomSheetModal
            ref={BottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 50 }}
            onDismiss={() => isSetOpen(false)}
          >
            <UpdateAppointmentWithBottomSheet />
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
              // console.log(item)
              return (
                <View
                  style={[
                    styles.container,
                    { backgroundColor: isOpen ? "#FFFFF7" : "white" },
                  ]}
                >
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
                          onPress={handlePressModalForUpdate}
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
// import React, { useRef, useState } from 'react';
// import {
//   FlatList,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   RefreshControl,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useQuery } from '@tanstack/react-query';
// import { getAllAppointment } from '../../services/appointment';
// import { format, isValid } from 'date-fns';
// import ViewProfileChat from '../../components/Doctor/ViewDoctorProfileChat';
// import { useSelector } from 'react-redux';
// import { checkIsDoctorLogin } from '../../redux/slice/authenticationSlice';
// import Schedule from './ScheduleAppointmentScreen';
// import { BottomSheetModal, BottomModalProvider } from '@gorhom/bottom-sheet';
// import DeleteConfirmationModal from './DeLeteAppointmentModal';
// import UpdateAppointmentWithBottomSheet from '../../components/Appointment/BottomSheetComponentAppointment';

// const ViewAllAppointment = () => {
//   const { data, isFetching } = useQuery({
//     queryKey: ['Appointment'],
//     queryFn: getAllAppointment,
//     onSuccess: () => {},
//   });
//   const isDoctorTrue = useSelector(checkIsDoctorLogin);

//   const navigation = useNavigation();

//   const [isOpen, isSetOpen] = useState(false);
//   const BottomSheetModalRef = useRef(null);
//   const snapPoints = ['25%', '50%'];

//   function handlePressModalForUpdate() {
//     BottomSheetModalRef.current?.present();
//     isSetOpen(true);
//   }

//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString);
//     return isValid(date) ? format(date, 'MM-dd-yyyy HH:mm') : 'Invalid Date';
//   };

//   // State for delete confirmation modal
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);

//   const handleDeleteConfirmation = (appointment) => {
//     setSelectedAppointment(appointment);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteAppointment = () => {
//     // Perform delete operation here
//     console.log('Deleting appointment:', selectedAppointment);
//     // Close the modal after deletion
//     setShowDeleteModal(false);
//   };

//   const handleCancelDelete = () => {
//     // Close the modal without deleting
//     setShowDeleteModal(false);
//   };

//   return (
//     <>
//       {isDoctorTrue ? (
//         <>
//           <BottomSheetModal
//             ref={BottomSheetModalRef}
//             index={0}
//             snapPoints={snapPoints}
//             backgroundStyle={{ borderRadius: 50 }}
//             onDismiss={() => isSetOpen(false)}
//           >
//             <UpdateAppointmentWithBottomSheet />
//           </BottomSheetModal>

//           <FlatList
//             data={data}
//             refreshControl={
//               <RefreshControl
//                 refreshing={isFetching}
//                 onRefresh={() => console.log('Refreshing...')}
//               />
//             }
//             renderItem={({ item }) => {
//               return (
//                 <View
//                   style={[
//                     styles.container,
//                     { backgroundColor: isOpen ? '#FFFFF7' : 'white' },
//                   ]}
//                 >
//                   <View style={styles.card}>
//                     <Text style={styles.dateText}>
//                       Created at: {formatDateTime(item.createdAt)}
//                     </Text>

//                     <View style={styles.header}>
//                       <Image
//                         style={styles.image}
//                         source={{
//                           uri: `${item?.profilePicture}`,
//                         }}
//                       />
//                       <View>
//                         <Text style={styles.nameText}>{item?.userFullName}</Text>
//                         <Text style={styles.appointmentText}>
//                           Appointment at: {item?.bookedTimeAMOrPM}
//                         </Text>
//                         <Text style={styles.genderText}>
//                           Gender: {item?.gender}
//                         </Text>
//                       </View>
//                     </View>

//                     <View style={styles.buttonContainer}>
//                       <TouchableOpacity
//                         style={[styles.button, styles.updateButton]}
//                         onPress={handlePressModalForUpdate}
//                       >
//                         <Text style={styles.buttonText}>Update</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity
//                         style={[styles.button, styles.deleteButton]}
//                         onPress={() => handleDeleteConfirmation(item)}
//                       >
//                         <Text style={styles.buttonText}>Delete</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </View>
//               );
//             }}
//             showsVerticalScrollIndicator={true}
//           />

//           {/* Delete Confirmation Modal */}
//           {showDeleteModal && (
//             <DeleteConfirmationModal
//               onCancel={handleCancelDelete}
//               onDelete={handleDeleteAppointment}
//             />
//           )}
//         </>
//       ) : (
//         <>
//           <ViewProfileChat />
//           <Schedule />
//         </>
//       )}
//     </>
//   );
// };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: "flex-start",
// //     alignItems: "flex-start",
// //     backgroundColor: "white",
// //     padding: 5,
// //   },
// //   card: {
// //     backgroundColor: "white",
// //     borderRadius: 15,
// //     padding: 16,
// //     shadowColor: "black",
// //     shadowOffset: {
// //       width: 0,
// //       height: 5,
// //     },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 6,
// //     elevation: 14,
// //     width: 350,
// //     height: 150,
// //     justifyContent: "flex-start",
// //     alignItems: "stretch",
// //   },
// //   header: {
// //     marginBottom: 16,
// //     alignItems: "center",
// //     flexDirection: "row",
// //   },
// //   image: {
// //     width: 50,
// //     height: 50,
// //     borderRadius: 15,
// //     marginRight: 10,
// //   },
// //   subtitle: {
// //     fontSize: 24,
// //     color: "#333",
// //   },
// //   content: {
// //     alignItems: "center",
// //     paddingTop: 5,
// //   },
// //   text: {
// //     fontSize: 17,
// //     color: "#444444",
// //     textAlign: "center",
// //   },
// //   buttonContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },
// //   button: {
// //     alignItems: "center",
// //     justifyContent: "center",
// //     paddingVertical: 5,
// //     paddingHorizontal: 10,
// //     borderRadius: 10,
// //     elevation: 3,
// //     marginHorizontal: 5,
// //   },
// //   textButton: {
// //     fontSize: 16,
// //     lineHeight: 21,
// //     fontWeight: "normal",
// //     letterSpacing: 0.25,
// //     color: "white",
// //   },
// // });

// export default ViewAllAppointment;
