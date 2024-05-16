
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Function to store authentication token
const storeAuthToken = async (token, authType) => {
  try {
    // Store token based on authentication type
    await ReactNativeAsyncStorage.setItem(`@${authType}_auth_token`, token);
  } catch (error) {
    console.error('Error storing auth token:', error);
  }
};

// Function to retrieve authentication token
const getAuthToken = async (authType) => {
  try {
    // Retrieve token based on authentication type
    const token = await ReactNativeAsyncStorage.getItem(`@${authType}_auth_token`);
    return token;
  } catch (error) {
    console.error('Error retrieving auth token:', error);
    return null;
  }
};

// Function to remove authentication token
const removeAuthToken = async (authType) => {
  try {
    // Remove token based on authentication type
    await ReactNativeAsyncStorage.removeItem(`@${authType}_auth_token`);
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};
