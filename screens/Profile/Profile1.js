import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { BASE_URL } from "@env";
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
import Spacer from "../../components/CustomComponent/Spacer";

export default function SetProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const isDoctor = useSelector(checkIsDoctorLogin);
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const baseURL = BASE_URL.toString();

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

    formData.append("profilePicture", imageURL);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("gender", gender);

    try {
      let response = await fetch(
        `${baseURL}/api/v1/profile/${decodedtoken?.userId}`,
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
    <View className="bg-white flex-1 justify-center items-center p-12">
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <>
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
            <Spacer />
          </>
        ) : (
          <>
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

                  borderRadius: 20,
                }}
              >
                <Feather name="edit" size={16} color="blue" />
              </View>
            </View>
            <Spacer />
          </>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        className="border border-slate-600 rounded-2xl"
        placeholder="Name"
        placeholderTextColor="#8D6F64"
        value={firstName}
        onChangeText={setFirstName}
      />
      <Spacer />

      <TextInput
        style={styles.input}
        className="border border-slate-600 rounded-2xl"
        placeholder="Surname"
        placeholderTextColor="#8D6F64"
        value={lastName}
        onChangeText={setLastName}
      />
      <Spacer />

      <TextInput
        style={styles.input}
        className="border border-slate-600 rounded-2xl"
        placeholder="Gender"
        placeholderTextColor="#8D6F64"
        value={gender}
        onChangeText={setGender}
      />
      <Spacer />

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
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 15,

    width: "100%",
    fontSize: 14,
    fontWeight: "500",
  },
});
