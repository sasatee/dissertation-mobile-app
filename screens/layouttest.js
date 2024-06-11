import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";

import { View, Text } from "react-native";
import React from "react";

export default function Layouttest() {
  useEffect(() => {
    const run = async () => {
      if (Platform.OS === "android") {
        await PermissionsAndroid.requestMultiple([
          "android.permission.POST_NOTIFICATIONS",
          "android.permission.BLUETOOTH_CONNECT",
        ]);
      }
    };
    run();
  }, []);
  return (
    <View>
      <Text>layouttest</Text>
    </View>
  );
}


