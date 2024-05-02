
import "core-js/stable/atob";
import {
  logoutJwtToken,
  logoutGoogleAccessToken,
  setJwtToken,
  setGoogleAccessToken,
} from "../redux/slice/authenticationSlice";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";


useEffect(() => {
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
}, []);

export default function checkAuthtoken() {
  return checkLoginState;
}
