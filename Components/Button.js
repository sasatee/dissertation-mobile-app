import React from "react";
import { Pressable } from "react-native";

export default function ButtonComponent({ title, handleOnPress, ...props }) {
  return <Pressable onPress={handleOnPress} {...props} />;
}
