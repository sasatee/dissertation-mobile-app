import { useEffect, useState } from "react";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import {
  logoutGoogleAccessToken,
  logoutJwtToken,
  setGoogleAccessToken,
  setJwtToken,
} from "../redux/slice/authenticationSlice";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

const useLoginState = () => {
  const dispatch = useDispatch();
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const checkLoginState = async () => {
      const jwtToken = await ReactNativeAsyncStorage.getItem("jwtToken");
      const googleToken = await ReactNativeAsyncStorage.getItem(
        "googleAccessToken"
      );

      if (jwtToken) {
        // Decode JWT token
        const decodedJwt = jwtDecode(jwtToken);
        //console.log("Decoded JWT Token:", decodedJwt);

        // Dispatch action to update state with JWT token
        dispatch(setJwtToken(jwtToken));
        setDecodedToken(decodedJwt);
      } else if (googleToken) {
        const decodedGoogle = jwtDecode(googleToken);
       // console.log("Decoded Google Token:", decodedGoogle);

        // Dispatch action to update state with Google access token
        dispatch(setGoogleAccessToken(googleToken));
        setDecodedToken(decodedGoogle);
      } else {
        // If neither token exists, logout
        dispatch(logoutJwtToken());
        dispatch(logoutGoogleAccessToken());
        setDecodedToken(null);
      }
    };

    checkLoginState();
  }, [dispatch,decodedToken]);

  return decodedToken;
};

export default useLoginState;
