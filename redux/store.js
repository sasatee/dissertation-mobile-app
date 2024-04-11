import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authenticationSlice from "./slice/authenticationSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    auth: authenticationSlice,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(),
  devTools: true, 
});

setupListeners(store.dispatch);
