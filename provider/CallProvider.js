import { useNavigation, useNavigationState } from "@react-navigation/native";
import { useCalls } from "@stream-io/video-react-native-sdk";
import React, { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CallProvider = ({ children }) => {
  // Extract current route name using useNavigationState
  const routeName = useNavigationState((state) => {
    if (!state || !state.routes || state.index === undefined) {
      return null;
    }
    return state.routes[state.index].name;
  });
  const routeCall = routeName === "Call";


  // Get calls and navigation
  const calls = useCalls();
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const call = calls[0];

  useEffect(() => {
    if (!call) {
      return;
    }
  }, [call]);

  return (
    <>
      {children}
      {call && !routeCall && (
        <TouchableOpacity
          style={{
            top:  top-8,
            position: "absolute",
            backgroundColor: "orange",
            left: 0,
            right: 0,
            padding: 5,
          }}
          onPress={() => navigation.navigate("Call", call.id)}
        >
          <Text>
            Active Call: {call.id}' '{call.state.callingState}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default CallProvider;
