import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {API_KEY_FIREBASE} from "@env"

const firebaseConfig = {
  apiKey: API_KEY_FIREBASE.toString(),
  authDomain: "tinder--auth.firebaseapp.com",
  projectId: "tinder--auth",
  storageBucket: "tinder--auth.appspot.com",
  messagingSenderId: "636281495496",
  appId: "1:636281495496:web:7b17b32b84a4c64f392afd",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore();

export { auth, db };
