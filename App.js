import "expo-dev-client";
import React from "react";

import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {  Provider as ReduxProvider } from "react-redux";
import MainNavigator from "./navigation/index";
import { AuthProvider } from "./provider/GoogleProvider";
import { store } from "./redux/store";
import { queryClientfn } from "./services/queryClient";

// const id = merchantIdentifier.toString();

const App = () => {
  useReactQueryDevTools(queryClientfn);

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClientfn}>
        <AuthProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <MainNavigator />
          </GestureHandlerRootView>
        </AuthProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default App;
