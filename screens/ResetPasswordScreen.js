// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, Alert } from 'react-native';
// import axios from 'axios';

// const ResetPassword = ({ navigation, route }) => {
//   const { token } = route.params;
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handlePasswordReset = async () => {
//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     try {
//       const response = await axios.patch(`https://your-backend-url/api/v1/auth/resetpassword/${token}`, {
//         password,
//         confirmPassword,
//       });
//       Alert.alert('Success', 'Password has been reset');
//       //navigation.navigate('Login');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to reset password');
//     }
//   };

//   return (
//     <View>
//       <Text>Enter your new password</Text>
//       <TextInput
//         placeholder="New Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <TextInput
//         placeholder="Confirm Password"
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//         secureTextEntry
//       />
//       <Button title="Reset Password" onPress={handlePasswordReset} />
//     </View>
//   );
// };

// export default ResetPassword;

import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

const ResetPassword = () => {
  const [inputValue, setInputValue] = useState("");
  const [responseData, setResponseData] = useState(null);

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const fetchData = () => {
    // Assuming your API endpoint is 'https://example.com/api/data'
    const apiUrl = `https://example.com/api/${inputValue}`;
    console.log(apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setResponseData(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <View>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        onChangeText={handleInputChange}
        value={inputValue}
        placeholder="Enter value"
      />
      <Button title="Fetch Data" onPress={fetchData} />
      {/* Display response data if available */}
      {responseData && <View>{/* Render your response data here */}</View>}
    </View>
  );
};

export default ResetPassword;
