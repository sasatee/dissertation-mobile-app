import { API_KEY_Gemini } from "@env";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import "react-native-gesture-handler";

import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
// import { isSpeakingAsync, speak, stop } from "expo-speech";
import ChatBubble from "./ChatBubble";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = ["75%"];

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }
  // Chatbot

  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const Api_key = API_KEY_Gemini.toString();

  const handleUserInput = async () => {
    let updateChat = [
      ...chat,
      {
        role: "user",
        parts: [{ text: userInput }],
      },
    ];

    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${Api_key}`,
        {
          contents: updateChat,
        }
      );
      // console.log("Gemini Pro api response", response.data);

      const modelResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (modelResponse) {
        // Add model response
        const updatedChatWithModel = [
          ...updateChat,
          {
            role: "model",
            parts: [{ text: modelResponse }],
          },
        ];
        setChat(updatedChatWithModel);
      }
    } catch (error) {
      console.error("Error calling Gemini Pro Api", error);
      setError("An error occurred. Please try again later!");
    }
    setLoading(false);
  };

  const handleSpeech = async (text) => {
    if (isSpeaking) {
      // if already speaking, stop the speech
      stop();
      setIsSpeaking(false);
    } else {
      // if not speaking, start the speech
      if (!(await isSpeakingAsync())) {
        speak(text);
        setIsSpeaking(true);
      }
    }
  };

  const renderChatItem = ({ item }) => (
    <ChatBubble
      role={item.role}
      text={item.parts[0].text}
      // onSpeech={() => handleSpeech(item.parts[0].text)}
    />
  );

  return (
    <BottomSheetModalProvider>
      <View className="flex-1 items-end justify-center m-10  bg-gray-">
        <TouchableOpacity onPress={handlePresentModal} >
        <Text className='top-1 text-sm text-sky-500'>Any help ?</Text>
        <Ionicons name="chatbubble-ellipses-sharp" size={30} color="gray" />
        </TouchableOpacity>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 50 }}
          onDismiss={() => setIsOpen(false)}
        >
          <View className="flex-1 bg-gray-100 border-t-slate-700 rounded-3xl  p-4">
            <Text className="text-center text-md text-gray-500 font-mulishsemibold mb-8">
              Health Assistance
            </Text>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            <FlatList
              data={chat}
              keyExtractor={(item) => item.id}
              renderItem={renderChatItem}
            />
            {error && <Text className="text-red-500">{error}</Text>}
          </View>
          <View className="flex-row items-center m-4">
            <TextInput
              placeholder="Type your message..."
              placeholderTextColor="#aaa"
              value={userInput}
              onChangeText={setUserInput}
              className="flex-1 h-10 border-gray-300 border px-2 rounded-3xl bg-white"
            />
            <TouchableOpacity
              onPress={handleUserInput}
              className="p-2 bg-[#000] rounded-xl ml-2"
            >
              <Text className="text-white font-normal">SEND</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}
