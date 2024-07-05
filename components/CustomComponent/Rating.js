import { Text, View } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

const Rating = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize:18, color:'black'}}>Rating Star</Text> 
      <AirbnbRating
        count={5}
        defaultRating={5}
        size={15}
        showRating={false}
       // isDisabled
        selectedColor="gold"
      />
    </View>
  );
};

export default Rating;