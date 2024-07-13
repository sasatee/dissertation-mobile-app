import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const ChatBubble = ({ role, text, onSpeech }) => {
  return (
    <View
      style={[
        styles.chatItem,
        role === "user" ? styles.userChatItem : styles.modelChatItem,
      ]}
    >
      <Text style={styles.chatText}>{text}</Text>
      {role === "model" && (
        <TouchableOpacity onPress={onSpeech} style={styles.speechIcon}>
          <Text>🎤</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  chatItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
    position: "relative",
  },
  userChatItem: {
    alignSelf: "flex-end",
    backgroundColor: "#000",
  },
  modelChatItem: {
    alignSelf: "flex-start",
    backgroundColor: "#848484",
  },
  chatText: {
    fontSize: 16,
    color: "#FFF",
  },
  speechIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
});
