import React from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useQuery } from "@tanstack/react-query";
import { getAllDoctor } from "../../services/doctor";

const ViewAllDoctorDetails = ({ navigation }) => {
  const { data, isError, isLoading, fetchStatus, isFetching, error } = useQuery(
    {
      queryKey: ["doctors"],
      queryFn: getAllDoctor,
      staleTime: 5000,
      // gcTime:100,
    }
  );

  let content;

  if (isLoading) {
    content = (
       <View className="bg-white/100 flex-1">
        <View className="flex-1 justify-center flex-row p-8">
          <Text className="text-center">
            <ActivityIndicator size="large" color="blue" />;
          </Text>
        </View>
      </View>
    );
  }

  if (data) {
    content = (
      <View className='flex-1 bg-white/50'>
        <View className="m-3 ">
        <FlatList
          data={data} // Use the dummy data array here
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Check", item._id)}
              className="bg-white/90 shadow-2xl rounded-lg my-5"
            >
              <Image
                source={{ uri: `${item.profilePicture}` }}
                style={{
                  margin: 5,
                  width: 150,
                  height: 120,
                  resizeMode: "cover",
                }}
                className="rounded-2xl"
              />
              <View className="gap-x-12  space-y-2 space-x-6">
                <Text className="text-left text-bold px-4 py-4 text-sm text-black/90">
                  <Text className="text-xs text-black/70">Dr.</Text>{" "}
                  {item.firstName} {""}
                  {item.lastName}
                </Text>

                <View className="flex flex-row-reverse">
                  <Text className="text-xs -left-0.5  text-black/80"> rating :
                   <Text className='text-xs'> {item.rating}</Text> 
                  </Text>
                </View>
                <View className="flex left-8 flex-row-reverse self-center py-3 gap-2 -top-1">
                  <Text className="bg-blue-500 text-white font-bold py-2 px-4 border border-blue-700 rounded-xl">
                    View more
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          // keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
          showsVerticalScrollIndicator={true}
        />
      </View>
      </View>
    
    );
  }
  return <>{content}</>;
};

export default ViewAllDoctorDetails;
