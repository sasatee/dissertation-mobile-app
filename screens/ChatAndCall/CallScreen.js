import React, { useEffect, useState } from "react";
import {
  CallContent,
  RingingCallContent,
  StreamCall,
  useCalls,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";

import { useNavigation } from "@react-navigation/native";

const CallScreen = ({ route }) => {
  const navigation = useNavigation();

  //const client = useStreamVideoClient();
  // const callId = route.params;

  // const [call, setCall] = useState(null);
  // useEffect(() => {
  //   const fetchCall = async () => {
  //     try {
  //       const call = client.call("default", callId);
  //       await call.get();
  //       setCall(call);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  //   fetchCall();
  //   return () => {
  //     if (call) {
  //       call.leave();
  //     }
  //   };
  // }, [callId]);

  const calls = useCalls();
  const call = calls[0];

  if (!call) {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Chat",route?.params);
    }
    return null;
  }

  return (
    <StreamCall call={call}>
      {/* <CallContent /> */}
      <RingingCallContent />
    </StreamCall>
  );
};

export default CallScreen;
