import { useState } from 'react';
import axios from 'axios';
import {BASE_URL} from "@env"

export const useGoogleLogin = () => {
  const [responseData, setResponseData] = useState(null);
  const [error1, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const googleLogin = async (postData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        BASE_URL + "api/v1/auth/google-login",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      //console.log(response.data)
      setResponseData(response.data);
    } catch (error1) {
      setError(error1);
    } finally {
      setIsLoading(false);
    }
  };

  return { responseData, error1, isLoading, googleLogin };
};

