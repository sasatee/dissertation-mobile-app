import { merchantIdentifier } from "@env";
import "expo-dev-client";
import React from "react";

import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { StripeProvider } from "@stripe/stripe-react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { AuthProvider } from "./provider/GoogleProvider";
import MainNavigator from "./navigation/index";
import { store } from "./redux/store";
import { queryClientfn } from "./services/queryClient";
import ChatProvider from "./provider/ChatProvider";
import VideoProvider from "./provider/VideoProvider";

const id = merchantIdentifier.toString();

const App = () => {
  useReactQueryDevTools(queryClientfn);

  return (
    <Provider store={store}>
      <StripeProvider publishableKey={id}>
        <QueryClientProvider client={queryClientfn}>
          <AuthProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <MainNavigator />
            </GestureHandlerRootView>
          </AuthProvider>
        </QueryClientProvider>
      </StripeProvider>
    </Provider>
  );
};

export default App;
