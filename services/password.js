
import axios from "axios";

import Constants from 'expo-constants';

const {
  BASE_URL,
 
} = Constants.expoConfig.extra;

export const sendResetEmail = async (email) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/forgotpassword`,
      email,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      "Could not send reset email to user email account" || error.response.data
    );
  }
};




export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


