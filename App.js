import "expo-dev-client";
import React from "react";

import { AuthProvider } from "./hooks/useGoogle";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import StackNavigator from "./navigation/StackNavigator";

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </Provider>
  );
};

export default App;
