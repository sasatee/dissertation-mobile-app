import React from "react";
import { TouchableOpacity } from "react-native";

export default function ButtonComponent({ title, handleOnPress, ...props }) {
  return <TouchableOpacity onPress={handleOnPress} {...props} />;
}
