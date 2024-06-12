import React from "react";
import {
  CallContent,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";
import { STREAM_PUBLIC } from "@env";
import { Text } from "react-native";

const apiKey = STREAM_PUBLIC;
const userId = "6640b042da333b00082e9a37";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjY0MGIwNDJkYTMzM2IwMDA4MmU5YTM3In0.6640b042da333b00082e9a37";
const callId = "default_f496fa0c-caa6-4722-8ce4-64db35659a95";
const user = { id: userId };

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);
call.join({ create: true });

const CallScreen = () => {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}><CallContent/></StreamCall>
    </StreamVideo>
  );
};

export default CallScreen;
