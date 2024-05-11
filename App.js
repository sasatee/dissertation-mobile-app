import "expo-dev-client";
import React from "react";
import { merchantIdentifier } from "@env";

import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { AuthProvider } from "./hooks/useGoogle";
import MainNavigator from "./navigation/index";
import { store } from "./redux/store";
import { queryClientfn } from "./services/queryClient";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useReactQueryDevTools } from "@dev-plugins/react-query";

const id = merchantIdentifier.toString();

const App = () => {
  useReactQueryDevTools(queryClientfn);
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={id}>
        <QueryClientProvider client={queryClientfn}>
          <AuthProvider>
            <MainNavigator />
          </AuthProvider>
        </QueryClientProvider>
      </StripeProvider>
    </Provider>
  );
};

export default App;
