import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Constants from "expo-constants";

const { BASE_URL } = Constants.expoConfig.extra;

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

export const getAllDoctor = async () => {
  try {
    const headers = await getHeaders();
    const response = await axiosInstance.get("api/v1/doctor", {
      headers,
    });

    return response.data.doctors;
  } catch (error) {
    // throw new Error(
    //   JSON.stringify(error.response.data) || "Cannot fetch doctors"
    // );
    throw new Error("Cannot fetch all doctors");
  }
};

export const getSingleDoctor = async ({ id, signal }) => {
  try {
    const headers = await getHeaders();
    const response = await axiosInstance.get(`api/v1/doctor/${id}`, {
      headers,
      id,
      signal,
    });

    return response.data;
  } catch (error) {
    // throw new Error(
    //   JSON.stringify(error.response.data) || "Cannot fetch doctors"
    // );
    throw new Error("Cannot fetch doctor");
  }
};

export const DoctorPaymentPrice = async ({ id, signal }) => {
  try {
    const headers = await getHeaders();
    const response = await axiosInstance.get(`api/v1/doctor/${id}`, {
      headers,
      id,
      signal,
    });

    return response.data.doctor.price;
  } catch (error) {
    // throw new Error(
    //   JSON.stringify(error.response.data) || "Cannot fetch doctors"
    // );
    throw new Error("Cannot fetch doctor");
  }
};
