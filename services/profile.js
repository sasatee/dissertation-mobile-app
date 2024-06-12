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



export const getUserProfileById = async ({ id, signal }) => {
  try {
    const headers = await getHeaders();
    const response = await axiosInstance.get(`api/v1/profile/${id}`, {
      headers,
      id,
      signal,
    });

    return response?.data?.user;
  } catch (error) {
    // throw new Error(
    //   JSON.stringify(error.response.data) || "Cannot fetch doctors"
    // );
    throw new Error("Cannot fetch profile");
  }
};