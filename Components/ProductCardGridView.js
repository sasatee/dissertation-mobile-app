import React from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const dummyData = [
  {
    productId: 1,
    title: "Product 1",
    price: 50,
    quantity: 10,
    imageUrl: require("../assets/icon.png"),
    availability: "In stock",
  },
  {
    productId: 2,
    title: "Product 2",
    price: 75,
    quantity: 5,
    imageUrl: require("../assets/icon.png"),
    availability: "Out of stock",
  },
  {
    productId: 3,
    title: "Product 3",
    price: 100,
    quantity: 20,
    imageUrl: require("../assets/icon.png"),
    availability: "In stock",
  },
   {
    productId: 4,
    title: "Product 4",
    price: 100,
    quantity: 20,
    imageUrl: require("../assets/icon.png"),
    availability: "In stock",
  },
   {
    productId: 5,
    title: "Product 5",
    price: 100,
    quantity: 20,
    imageUrl: require("../assets/icon.png"),
    availability: "In stock",
  },
   {
    productId: 3,
    title: "Product 3",
    price: 100,
    quantity: 20,
    imageUrl: require("../assets/icon.png"),
    availability: "In stock",
  },
   {
    productId: 3,
    title: "Product 3",
    price: 100,
    quantity: 20,
    imageUrl: require("../assets/icon.png"),
    availability: "In stock",
  },

];

const ProductGridCard = () => {
  const navigation = useNavigation();
  return (
    <>
      <View className="bg-white-20 mx-1 py-10">
        <FlatList
          data={dummyData} // Use the dummy data array here
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Product", item)}
              className="bg-white-100  shadow-md rounded-lg my-4 mx-2 "
            >
              <Image
                source={item.imageUrl}
                style={{
                  width: 150,
                  height: 150,
                  resizeMode: "contain",
                  borderRadius: 25,
                }}
                className="rounded-lg"
              />
              <View className="ml-1 flex-1 gap-5">
                <Text className="text-left px-2 text-xs text-green-300">{item.title}</Text>
                <View className="flex flex-row-reverse items-center mt-3 top-1">
                  <Text className="text-xs text-end">{item.availability}</Text>
                  
                </View>
                <View className="flex flex-row-reverse items-center pt-3">
                  <Text>${item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          showsVerticalScrollIndicator={true}
        />
      </View>
    </>
  );
};


export default ProductGridCard;

// import React from "react";
// import { FlatList, Text, View, Image, ScrollView } from "react-native";
// import { useGetAllAppointments } from "../hooks/UseAppointment";

// const ProductGridCard = ({
//   handlePress,
//   imgSource,
//   name,
//   availQty,
//   price,
//   qty,
//   isLowStock,
//   hasQty,
// }) => {
//   const {
//     appointments,
//     loading: appointmentsLoading,
//     error: appointmentsError,
//   } = useGetAllAppointments();
//   //console.log(appointments.appointments);
//   const data = [
//     {
//       __v: 0,
//       _id: "6610e6291a1ec50008485ad5",
//       createdAt: "2024-04-06T06:05:29.196Z",
//       doctorId: "6610e3b31a1ec50008485abd",
//       reason: "login with jwt diseases",
//       updatedAt: "2024-04-06T06:05:29.196Z",
//       userId: "6610e3da1a1ec50008485ac0",
//     },
//     {
//       __v: 0,
//       _id: "661c65bc29a22d0008525e68",
//       createdAt: "2024-04-14T23:24:44.644Z",
//       doctorId: "6610e3b31a1ec50008485abd",
//       reason: "ddadadadadadasdada with jwt diseases",
//       updatedAt: "2024-04-14T23:24:44.644Z",
//       userId: "661c657929a22d0008525e61",
//     },
//     {
//       __v: 0,
//       _id: "661d5f2f9a289b0008faa2a2",
//       createdAt: "2024-04-15T17:09:03.095Z",
//       doctorId: "661272062164cd46406b9e7a",
//       reason: "updateeeees diseases reason",
//       updatedAt: "2024-04-15T17:34:42.172Z",
//       userId: "661d556e012a6b0009c2d650",
//     },
//   ];
//    const renderItems = () => {
//     return data.map(item => (
//       <View key={item._id} style={{ padding: 10, marginRight: 10, borderWidth: 1, borderColor: '#ccc' }}>
//         <Text>User ID: {item.userId}</Text>
//         <Text>Doctor ID: {item.doctorId}</Text>
//         <Text>Reason: {item.reason}</Text>
//         <Text>Created At: {item.createdAt}</Text>
//       </View>
//     ));
//   };

//   return (
//     <ScrollView horizontal>
//       <View style={{ flex:1,flexDirection: 'row', padding: 50 }}>
//         {renderItems()}
//       </View>
//     </ScrollView>
//   );
// };

// export default ProductGridCard;
