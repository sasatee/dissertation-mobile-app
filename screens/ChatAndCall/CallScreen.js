
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
  const [isRinging, setIsRinging] = useState(false);

  const calls = useCalls();
  const call = calls[0];

  useEffect(() => {
    if (!call) {
      if (navigation.canGoBack()) {
    
        navigation.navigate("Chat", route?.params);
      }
      return;
    }

    const handleCallStateChange = () => {
      if (call.state.callingState === 'ringing') {
        setIsRinging(true);
      } else {
        setIsRinging(false);
      }
    };

    handleCallStateChange();

    call.on('stateChanged', handleCallStateChange);

    return () => {
      call.off('stateChanged', handleCallStateChange);
    };
  }, [call, navigation, route]);

  if (!call) {
    return null;
  }

  return (
    <StreamCall call={call}>
      {isRinging && <RingingCallContent /> }
    </StreamCall>
  );
};

export default CallScreen;
