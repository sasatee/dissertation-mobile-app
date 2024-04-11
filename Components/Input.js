import { TextInput, View,StyleSheet } from "react-native";
export default function Input({ name, ...props }) {
  return (
    <View className="px-2">
      <TextInput placeholder={name} {...props} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
   // marginHorizontal:20,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 4,
    
  },
});
