import React, { useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const PINInput = ({ onPINChange }) => {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const otpInputs = Array(6).fill(null);
  const inputRefs = useRef(otpInputs.map(() => React.createRef()));

  const handleOTPChange = (index, text) => {
    const newOTP = [...otp];
    if (/^\d?$/.test(text)) {
      newOTP[index] = text;
      setOTP(newOTP);

      if (text !== "" && index < 5) {
        inputRefs.current[index + 1].current.focus();
      }
    }
    onPINChange(newOTP.join(""));
  };

  const handleOTPKeyPress = (index, event) => {
    if (event.nativeEvent.key === "Backspace") {
      const newOTP = [...otp];
      newOTP[index] = "";
      setOTP(newOTP);
      onPINChange(newOTP.join(""));

      if (index > 0) {
        inputRefs.current[index - 1].current.focus();

        newOTP[index - 1] = "";
        setOTP(newOTP);
        onPINChange(newOTP.join(""));
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter OTP number</Text>
      <View style={styles.inputContainer}>
        {otpInputs.map((_, index) => (
          <View style={styles.inputWrapper} key={index}>
            <TextInput
              style={styles.otpInput}
              value={otp[index]}
              onChangeText={(text) => handleOTPChange(index, text)}
              onKeyPress={(event) => handleOTPKeyPress(index, event)}
              keyboardType="numeric"
              placeholderTextColor="white"
              maxLength={1}
              ref={inputRefs.current[index]}
              textAlign="center"
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },
  label: {
    fontFamily: "Mulish_400Regular",
    fontSize: 18,
    marginBottom: 10,
    color: "grey",

    paddingLeft: 5,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  inputWrapper: {
    marginHorizontal: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  otpInput: {
    width: 40,
    height: 40,
    fontSize: 24,
    color: "white",
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    textAlign: "center",
  },
});

export default PINInput;
