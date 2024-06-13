import React from "react";
import {
  CallContent,
  StreamCall,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";

const callId = "default_e35cdb7c-f44a-4f91-8124-50d0a64d8a78";

const CallScreen = () => {
  const client = useStreamVideoClient();
  // console.log(client)

  const call = client.call("default", callId);
  call.join({ create: true });

  return (
    <StreamCall call={call}>
      {/* <CallContent /> */}
    </StreamCall>
  );
};

export default CallScreen;
