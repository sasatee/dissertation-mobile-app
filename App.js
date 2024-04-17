import "expo-dev-client";
import React from "react";

import { AuthProvider } from "./hooks/useGoogle";

import { Provider } from "react-redux";
import MainNavigator from "./navigation/index";
import { store } from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </Provider>
  );
};

export default App;