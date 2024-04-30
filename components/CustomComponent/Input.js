import { Text, TextInput, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Input({ placeholder, error, ...props }) {
  return (
    <Animated.View
      entering={FadeInDown.delay(200).duration(1000).springify()}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        padding: 10,
        borderRadius: 12,
        marginBottom: 14,
        width: "100%",
       // borderColor: "blue",
      }}
    >
      <TextInput
        placeholder={placeholder}
        {...props}
        placeholderTextColor="black"
        style={{ height: 40, }} // Adjust height as needed
      />
      {error && (
        <Text style={{ fontSize: 12, color: "red", top: 8 }}>{error}</Text>
      )}
    </Animated.View>
  );
}
