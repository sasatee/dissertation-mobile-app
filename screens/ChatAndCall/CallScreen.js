import React, { useEffect, useState } from "react";
import {
  CallContent,
  RingingCallContent,
  StreamCall,
  useCalls,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { ActivityIndicator } from "react-native";

const CallScreen = ({ route }) => {
  const client = useStreamVideoClient();
  const callId = route.params;

  //const [call, setCall] = useState(null);
  // useEffect(() => {
  //   const fetchCall = async () => {
  //     try {
  //       const call = client.call("default", callId);
  //       await call.join();
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
    return <ActivityIndicator />;
  }

  return (
    <StreamCall call={call}>
      {/* <CallContent /> */}
      <RingingCallContent />
    </StreamCall>
  );
};

export default CallScreen;
