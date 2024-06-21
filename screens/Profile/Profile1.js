import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  // Request permission when component mounts
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

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

      console.log("Image Picker Result:", result);

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
    <View className="flex-1 items-center justify-start py-5 ">
      <TouchableOpacity onPress={pickImage} >
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
