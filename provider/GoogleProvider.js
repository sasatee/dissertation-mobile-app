import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "@firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth } from "../firebase";


import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { logoutGoogleAccessToken } from "../redux/slice/authenticationSlice";
import { useGoogleLogin } from "../services/google";
import Constants from 'expo-constants';

const AuthContext = createContext({});
const { WEB_CLIENT_ID } = Constants.expoConfig.extra;

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const { googleLogin } = useGoogleLogin();
  const dispatch = useDispatch();

  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID.toString(),
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "locations"],
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoadingInitial(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo) {
        const { idToken } = userInfo;
        const credential = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(auth, credential);

        const { accessToken } = await GoogleSignin.getTokens();
        const postData = {
          access_token: accessToken,
          code: idToken,
        };

        await googleLogin(postData);
      }
    } catch (error) {
      console.log("Error signing in with Google:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await ReactNativeAsyncStorage.removeItem("googleAccessToken");
      console.log("googleAccess Token removed");
      dispatch(logoutGoogleAccessToken());

      setLoading(true);
      await signOut(auth);
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      setUser(null);
    } catch (error) {
      //console.error("Error signing out:", error);
      setError(error);
    }
  };

  const authContextValue = useMemo(
    () => ({
      user,
      loading,
      error,
      signInWithGoogle,
      logout,
    }),
    [user, loading, error, signInWithGoogle, logout]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
