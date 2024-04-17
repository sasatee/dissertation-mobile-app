import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="m-12">
      <Text>RegisterScreen</Text>
      <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
        <Text className="text-center bg-slate-500 underline-offset-2">Go to login Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
