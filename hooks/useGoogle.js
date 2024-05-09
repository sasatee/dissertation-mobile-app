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

import { WEB_CLIENT_ID } from "@env";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import {
  logoutGoogleAccessToken,
  logoutJwtToken,
  setGoogleAccessToken,
  setJwtToken,
} from "../redux/slice/authenticationSlice";
import { useGoogleLogin } from "../services/google";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

const AuthContext = createContext({});

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

  useEffect(() => {
    // const checkLoginState = async () => {
    //   const jwtToken = await ReactNativeAsyncStorage.getItem("jwtToken");
    //   const googleToken = await ReactNativeAsyncStorage.getItem(
    //     "googleAccessToken"
    //   );
    //   console.log("Retrieved JWT Token:", jwtToken);
    //   console.log("Retrieved Google Token:", googleToken);
    //   if (jwtToken) {
    //     // Dispatch action to update state with JWT token
    //     dispatch(setJwtToken(jwtToken));
    //   } else if (googleToken) {
    //     // Dispatch action to update state with Google access token
    //     dispatch(setGoogleAccessToken(googleToken));
    //   } else {
    //     // No token found, user is not logged in
    //     // Update state accordingly to reflect logged out state
    //     // Ensure you have appropriate actions for handling logged-out state in your Redux setup
    //     dispatch(logoutJwtToken());
    //     dispatch(logoutGoogleAccessToken());
    //   }
    // };
    const checkLoginState = async () => {
      const jwtToken = await ReactNativeAsyncStorage.getItem("jwtToken");
      const googleToken = await ReactNativeAsyncStorage.getItem(
        "googleAccessToken"
      );
      console.log("Retrieved JWT Token:", jwtToken);
      console.log("Retrieved Google Token:", googleToken);

      if (jwtToken) {
        // Decode JWT token
        const decodedJwt = jwtDecode(jwtToken);
        console.log("Decoded JWT Token:", decodedJwt);

        // Dispatch action to update state with JWT token
        dispatch(setJwtToken(jwtToken));
      } else if (googleToken) {
        const decodedGoogle = jwtDecode(googleToken);
        //
        console.log("Decoded JWT Token:", decodedGoogle);
        // Dispatch action to update state with Google access token
        dispatch(setGoogleAccessToken(googleToken));
      } else {
        // No token found, user is not logged in
        // Update state accordingly to reflect logged out state
        // Ensure you have appropriate actions for handling logged-out state in your Redux setup
        dispatch(logoutJwtToken());
        dispatch(logoutGoogleAccessToken());
      }
    };

    checkLoginState();
  }, [dispatch]);

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
      console.error("Error signing out:", error);
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
