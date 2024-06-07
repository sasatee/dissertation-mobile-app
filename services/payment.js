import { BASE_URL } from "@env";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import axios, { Axios } from "axios";

const baseURL = BASE_URL.toString();

const axiosInstance = axios.create({
  baseURL,
});

const getHeaders = async () => {
  let headers = {};

  const token = await ReactNativeAsyncStorage.getItem("jwtToken");
  const googleAccessToken = await ReactNativeAsyncStorage.getItem(
    "googleAccessToken"
  );

  if (token && googleAccessToken) {
    headers.Authorization = `Bearer ${token},${googleAccessToken}`;
  } else if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else if (googleAccessToken) {
    headers.Authorization = `Bearer ${googleAccessToken}`;
  } else {
    //console.error("No token available");
  }

  return headers;
};


export async function PaymentToBookAppointment(body) {
  try {
    const headers = await getHeaders();
    const response = await axiosInstance.post(`api/v1/payment/intents`, body, {
      headers: headers,
    });


    return response.data;
  } catch (error) {
    // throw new Error(
    //   JSON.stringify(error.response.data) ||
    //     "Cannot book appointment with doctor"
    // );
    throw new Error(
      "Cannot Proceed Payment. Please try Again later!"
    );
  }
}
