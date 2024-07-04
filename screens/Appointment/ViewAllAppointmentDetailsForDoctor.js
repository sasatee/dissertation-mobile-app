import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";


const ViewAllAppointmentDetailsForDoctor = () => {
  return (
    <View style={styles.container}>
      {/* Card */}
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={require("../../assets/images/unslash.png")}
          />
          <View className=''>
            <Text className="text-lg text-left	 text-[#333] mx-1">
              React Native Card
            </Text>
            <Text className="text-sm text-[#333] mx-1">React Native Card</Text>
		  <Text className="text-xs text-[#333] mx-1">React Native Card</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
	   <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} className='bg-black' onPress={() => console.log("Update")}>
              <Text style={styles.textButton}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} className='bg-red-500' onPress={() => console.log("Delete")}>
              <Text style={styles.textButton}>Delete</Text>
            </TouchableOpacity>
          </View>
		
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "white",
    padding: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 16,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    width: 250,
    height: 150,
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
    paddingTop:5
  },
  text: {
    fontSize: 17,
    color: "#444444",
    textAlign: "center",
  },
  buttonContainer: {
	flexDirection: 'row',
	alignItems: 'center',
   },
   button: {
	alignItems: 'center',
	justifyContent: 'center',
	paddingVertical: 5,
	paddingHorizontal: 10,
	borderRadius: 10,
	elevation: 3,
	marginHorizontal: 5,
   },
   textButton: {
	fontSize: 16,
	lineHeight: 21,
	fontWeight: 'bold',
	letterSpacing: 0.25,
	color: 'white',
   },
 
});

export default ViewAllAppointmentDetailsForDoctor;
