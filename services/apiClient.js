import { BASE_URL } from "@env";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const apiClient = axios.create({
  baseURL: BASE_URL.toString(),
});

// Request interceptor headers
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Retrieve tokens
      const token = await ReactNativeAsyncStorage.getItem("jwtToken");
      const googleAccessToken = await ReactNativeAsyncStorage.getItem("googleAccessToken");

      // Attach headers 

      if (token && googleAccessToken) {
        config.headers.Authorization = `Bearer ${token},${googleAccessToken}`;
      } else if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else if (googleAccessToken) {
        config.headers.Authorization = `Bearer ${googleAccessToken}`;
      }
    } catch (error) {
      console.error("Error retrieving tokens", error);
    }
  

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
