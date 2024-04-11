import React, { useState } from 'react';
import { View, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const ChatScreen = () => {
  const [selectedGender, setSelectedGender] = useState('');

  const updateGender = async () => {

  //console.log(selectedGender)
  }

  return (
    <View style={{flex:1}}>
   
      <Button title="Update Gender" onPress={updateGender} />
    </View>
  );
};

export default ChatScreen;
