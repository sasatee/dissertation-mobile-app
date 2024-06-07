import { BASE_URL } from "@env";
import axios from "axios";

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

export const resetPassword = async (code) => {
try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/auth/resetpassword/${code}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      "Could not send reset password. Please your enter correctly the verification code" || error.response.data
    );
  }


};
