import "expo-dev-client";
import React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { AuthProvider } from "./hooks/useGoogle";
import MainNavigator from "./navigation/index";
import { store } from "./redux/store";
import { queryClientfn } from "./services/queryClient";

const App = () => {

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClientfn}>
        <AuthProvider>
          <MainNavigator />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
