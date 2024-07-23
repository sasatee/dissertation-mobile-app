// firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import Constants from "expo-constants";

const { API_KEY_FIREBASE } = Constants.expoConfig.extra;

const firebaseConfig = {
  apiKey: API_KEY_FIREBASE.toString(),
  authDomain: "tinder--auth.firebaseapp.com",
  projectId: "tinder--auth",
  storageBucket: "tinder--auth.appspot.com",
  messagingSenderId: "636281495496",
  appId: "1:636281495496:web:7b17b32b84a4c64f392afd",
};

// Initialize Firebase if it hasn't been initialized already
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Auth if it hasn't been initialized already
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch (error) {
  auth = getAuth();
}

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };
