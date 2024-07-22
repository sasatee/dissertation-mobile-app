import Constants from "expo-constants";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setGoogleAccessToken } from "../redux/slice/authenticationSlice";

const { BASE_URL } = Constants.expoConfig.extra;

export const useGoogleLogin = () => {
  const [error1, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const googleLogin = async (postData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        BASE_URL + "/api/v1/auth/google-login",
        //"https://737c-102-117-104-132.ngrok-free.app/api/v1/auth/google-login",
        postData
      );

      const result = await response.data;

      dispatch(setGoogleAccessToken(result.token));

      await ReactNativeAsyncStorage.setItem("googleAccessToken", result.token);

      return response.data;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { error1, isLoading, googleLogin };
};
