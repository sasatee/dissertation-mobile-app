import React, { createContext, useContext, useEffect, useState, useMemo ,useNavigation} from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential, signOut, onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { useGoogleLogin } from "../services/googleApiCallWithBackend";




const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const { googleLogin } = useGoogleLogin();
  

  GoogleSignin.configure({
    webClientId: "636281495496-6j0lsg9o1h54ujicsb3eame8gpohnbd8.apps.googleusercontent.com",
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
      console.error("Error signing in with Google:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      console.log("logging out")
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      setError(error);
    } 
  };

  const authContextValue = useMemo(() => ({
    user,
    loading,
    error,
    signInWithGoogle,
    logout,
  }), [user, loading, error]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
