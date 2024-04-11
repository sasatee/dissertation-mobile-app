import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@env";
import { useDispatch } from "react-redux";
import { setGoogleAccessToken } from "../redux/slice/authenticationSlice";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

export const useGoogleLogin = () => {
  //const [responseData, setResponseData] = useState(null);
  const [error1, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const googleLogin = async (postData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        BASE_URL + "api/v1/auth/google-login",
        // "https://cade-102-117-180-90.ngrok-free.app/api/v1/auth/google-login",
        postData
      );

      const result = await response.data;

      //setResponseData(result.token);

      dispatch(setGoogleAccessToken(result.token));
      ReactNativeAsyncStorage.setItem("googleAccessToken", result.token);
      console.log('Google Access Token saved:', result.token);


      return response.data;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {  error1, isLoading, googleLogin };
};
