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

export async function bookAppointment(appointment) {
  try {
    const headers = await getHeaders();
    const response = await axiosInstance.post(
      `api/v1/appointment`,
      appointment,
      {
        headers: headers,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      JSON.stringify(error.response.data) ||
        "Cannot book appointment with doctor"
    );
    // throw new Error(
    //   "Cannot book appointment with doctor. Please try Again later!"
    // );
  }
}

export async function getAllAppointment() {
  try {
    const headers = await getHeaders();
    const response = await axiosInstance.get(`api/v1/appointment`, { headers });
  
    return response.data.appointments;
  } catch (error) {
    // throw new Error(
    //   JSON.stringify(error.response.data) ||
    //     ""
    // );
    throw new Error(
      "Cannot load all appointment with your respective doctors. Please try Again later!"
    );
  }
}

export async function getAppointmentSchedule({ date, userId,signal }) {
  try {
    const headers = await getHeaders();

    const response = await axiosInstance(
      `api/v1/appointment/${userId}?bookedDate=${date}`,

      { headers,signal }
    );

    return response?.data?.appointments;
  } catch (error) {
    throw new Error(
      JSON.stringify(error.response.data) ||
        `Failed to fetch client appointments by its ${date}`
    );
    //console.error(`Failed to fetch client appointments by its ${date}`)

    //throw new Error(`Failed to fetch client appointments by its ${date}`);
  }
}
