// import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { app } from "../../firebase"; 
import useLoginState from "../../hooks/UseLoginState";
import { checkIsDoctorLogin } from "../../redux/slice/authenticationSlice";

export default function ImagePickerExample() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const isDoctor = useSelector(checkIsDoctorLogin);
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  // Uploading state to Firebase
  const [uploading, setUploading] = useState(false);

  const decodedtoken = useLoginState();
  const userLoginWithJWT = useSelector((state) => state.auth.token); 

  // Request permission when component mounts
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  const uploadImageToFirebase = async (uri) => {
    try {
      setUploading(true);
      const response = await fetch(uri);
      const blob = await response.blob();

      const storage = getStorage(app);
      const storageRef = ref(
        storage,
        `images/${Date.now()}-${blob?._data?.name}`
      );

      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      return downloadURL;
    } catch (error) {
      console.error("Error uploading image to Firebase:", error);
      Alert.alert("Error", "Failed to upload image to Firebase.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const pickImage = async () => {
    if (!hasPermission) {
      Alert.alert(
        "Permission Denied",
        "Permission to access media library is required."
      );
      return;
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri =
          result.assets && result.assets.length > 0
            ? result.assets[0].uri
            : result.uri;
        setImage(uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Something went wrong while picking the image.");
    }
  };

  const handleSave = async () => {
    if (!image) {
      Alert.alert("No Image Selected", "Please select an image first.");
      return;
    }

    const imageURL = await uploadImageToFirebase(image);
    if (imageURL) {
      // Proceed to send form data with imageURl
      await uploadProfileData(imageURL);
    }
  };

  const uploadProfileData = async (imageURL) => {
    const formData = new FormData();
    console.log("URL", imageURL);
    formData.append("profilePicture", imageURL);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("gender", gender);

    try {
      let response = await fetch(
        `https://dissertation-backend-two.vercel.app/api/v1/profile/${decodedtoken?.userId}`,
        {
          method: "PATCH",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + userLoginWithJWT,
          },
        }
      );

      let data = await response.json();

      console.log("Upload successful!", data);
      // Optionally, update local state or show a success message
    } catch (error) {
      console.error("Upload failed:", error);
      Alert.alert("Error", "Failed to upload profile data to server.");
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting permissions...</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>No access to media library.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <View>
            <Image
              source={{ uri: image }}
              style={{ height: 100, width: 100, borderRadius: 75 }}
            />
            <View
              style={{
                position: "absolute",
                right: 5,
                bottom: 5,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 5,
              }}
            >
              <Feather name="edit" size={16} color="blue" />
            </View>
          </View>
        ) : (
          <View>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={{ height: 100, width: 100, borderRadius: 75 }}
            />
            <View
              style={{
                position: "absolute",
                right: 5,
                bottom: 5,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 5,
              }}
            >
              <Feather name="edit" size={16} color="blue" />
            </View>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        disableFullscreenUI
      /> */}
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />

      <Button
        title={uploading ? "Uploading..." : "Save"}
        onPress={handleSave}
        disabled={uploading}
      />
      {uploading && <ActivityIndicator size="large" color="#0000ff" />}

      {isDoctor && <Text> doctor is true</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});
