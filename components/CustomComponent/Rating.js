import { Text, View } from "react-native";
import { AirbnbRating } from "react-native-ratings";

const Rating = ({ rating, isDisabled,size }) => {
  console.log("RATING STAR", rating);
  return (
    <View>
      <AirbnbRating
        count={5}
        defaultRating={rating}
        size={size}
        showRating={false}
        isDisabled={isDisabled}
        selectedColor="gold"
      />
    </View>
  );
};

export default Rating;
