import React from "react";
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";
import { STREAM_PUBLIC } from "@env";
import { Text } from "react-native";

// const apiKey = STREAM_PUBLIC;
// const userId = "6668200561fc430009fc2286";
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjY4MjAwNTYxZmM0MzAwMDlmYzIyODYiLCJmaXJzdG5hbWUiOiJZZnkiLCJsYXN0bmFtZSI6IkhmaHh4aHgiLCJpc0RvY3RvciI6ZmFsc2UsImdlbmRlciI6Im1hbGUiLCJpYXQiOjE3MTgxMDk2NjQsImV4cCI6MTcyMDcwMTY2NH0.pKgGKbe61cBLDBi_xsk5tjbmZR1xlscbjvWFR7E1RoI";
// const callId = "my-call-id";
// const user = { id: userId };

// const client = new StreamVideoClient({ apiKey, user, token });
// const call = client.call("default", callId);
// call.join({ create: true });

const CallScreen = () => {
  return (
    <Text>fsffs</Text>
    // <StreamVideo client={client}>
    //   <StreamCall call={call}>{/* Your UI */}</StreamCall>
    // </StreamVideo>
  );
};

export default CallScreen;
