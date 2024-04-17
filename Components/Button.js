import React from "react";
import { Button } from "react-native";

export default function ButtonComponent({ title, handleOnPress, ...props }) {
  return <Button title={title} onPress={handleOnPress} {...props} />;
}
