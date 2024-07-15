import { View, FlatList, Image, Dimensions } from "react-native";
import React, { useState, useEffect, useRef } from "react";

const SliderList = [
  {
    id: 0,
    name: "slider 0",
    imgUrl:
      "https://cdn.dribbble.com/userupload/5146252/file/original-45b5a98c9b05562bbdec98a0d7d972f7.jpg?resize=1024x768",
  },
  {
    id: 1,
    name: "silder 3",
    imgUrl:
      "https://cdn.dribbble.com/userupload/12079029/file/original-a844c4177aacca9d2f5a547acc3d584a.jpg?resize=1024x576",
  },
  {
    id: 2,
    name: "slider 1",
    imgUrl:
      "https://media.gettyimages.com/id/1176527167/vector/check-up-concept-geometric-pop-art-and-retro-style-web-banner-and-poster-concept-with.jpg?s=2048x2048&w=gi&k=20&c=bXzJ-B3Mqaa8ixMuGLWZRjp_l2cLhj9T5HICkqGLv-g=",
  },
  {
    id: 3,
    name: "slider 2",
    imgUrl:
      "https://media.gettyimages.com/id/1481753336/vector/national-nurses-week-poster-vector.jpg?s=2048x2048&w=gi&k=20&c=b0PXuwtz2i7MDVCA0p29lHrrLSd0obFSxCX0-0BSMC0=",
  },
  {
    id: 4,
    name: "silder 3",
    imgUrl:
      "https://cdn.dribbble.com/userupload/12079029/file/original-a844c4177aacca9d2f5a547acc3d584a.jpg?resize=1024x576",
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === SliderList.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
    }
  }, [currentIndex]);

  return (
    <View className="my-10 mx-1">
      <FlatList
        ref={flatListRef}
        data={SliderList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.imgUrl }}
            style={{
              width: Dimensions.get("screen").width * 0.9,
              height: 170,
              borderRadius: 10,
              margin: 5,
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Slider;
