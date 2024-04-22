// import { Text, TextInput, View } from "react-native";
// import Animated, { FadeInDown } from "react-native-reanimated";

// export default function Input({ name, error, ...props }) {
//   return (
//     <Animated.View
//       entering={FadeInDown.delay(200).duration(1000).springify()}
//       className="bg-black/20 p-3 rounded-2xl w-full mb-5"
//     >
//       <TextInput placeholder={name}  placeholderTextColor={"white"} {...props}/>
//       <View className='flex flex-col-reverse'>
//         {error && (
//           <Text className=" text-xs text-start self-start -top-2 text-red-800  ">
//             {error}
//           </Text>
//         )}
//       </View>
//     </Animated.View>
//   );
// }


import { Text, TextInput, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Input({ placeholder, error, ...props }) {
  return (
    <Animated.View
      entering={FadeInDown.delay(200).duration(1000).springify()}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", padding: 10, borderRadius: 12, marginBottom: 10, width: '100%' }}
    >
      <TextInput
        placeholder={placeholder}
        {...props}
        placeholderTextColor="white"
        style={{ height: 40, color: 'white' }} // Adjust height as needed
      />
      {error && (
        <Text style={{ fontSize: 12, color: "red",top:6 }}>
          {error}
        </Text>
      )}
    </Animated.View>
  );
}
