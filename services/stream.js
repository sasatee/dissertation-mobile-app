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
    // console.error("No token available");
  }

  return headers;
};

export async function getStreamToken() {
  try {
    const headers = await getHeaders();

    const response = await axiosInstance.get(`api/v1/token`, { headers });

    return response?.data?.streamToken;
  } catch (error) {
    // throw new Error(
    //   JSON.stringify(error.response.data) ||
    //     ""
    // );
    throw new Error("Cannot get stream token. Try again!");
  }
}
