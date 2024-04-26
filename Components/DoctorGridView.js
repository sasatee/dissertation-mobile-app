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

const ProductGridCard = ({navigation}) => {
  // const navigation = useNavigation();
  return (
    <>
      <View className="bg-black/20">
        <FlatList
          data={dummyData} // Use the dummy data array here
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Check", item.productId)}
            
              className="bg-white  shadow-md rounded-lg my-4 mx-2 "
            >
              <Image
                source={item.imageUrl}
                style={{
                  width: 150,
                  height: 150,
                  resizeMode: "contain",
                  borderRadius: 35,
                }}
                className="rounded-lg"
              />
              <View className="flex flex-col justify-evenly gap-x-10  space-y-1">
                <Text className="text-left px-4 py-4 text-xs text-green-300">
                  {item.title}
                </Text>
                <View className="flex flex-row-reverse  mt-3 top-1">
                  <Text className="text-xs text-end">{item.availability}</Text>
                </View>
                <View className="flex self-end flex-row-reverse py-3 gap-2 -top-4">
                  <Text>${item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
         // keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-around",
            flexDirection: "row",
          }}
          showsVerticalScrollIndicator={true}
        />
      </View>
    </>
  );
};

export default ProductGridCard;
