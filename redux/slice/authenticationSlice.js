import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "@env";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

const initialState = {
  token: null,
  isLogged: false,
  loading: true,
  googleAccessToken: null,
};

export const signUpUser = createAsyncThunk(
  "user/register",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(">>>>>>>>>>>>>>>>>>>>", body);

      return data;
    } catch (error) {
      rejectWithValue(error.response.data.msg);
    }
  }
);

export const googleSigin = createAsyncThunk(
  "user/googlesign",
  async (postData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        // BASE_URL + "api/v1/auth/google-login",
        "https://cade-102-117-180-90.ngrok-free.app/api/v1/auth/google-login",
        postData
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response.msg);
    }
  }
);

export const signInUser = createAsyncThunk(
  "user/login",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        BASE_URL + "/api/v1/auth/login",
        //"https://cade-102-117-180-90.ngrok-free.app/api/v1/auth/login",
        userCredentials
      );

      return data;
    } catch (error) {
      rejectWithValue(error.response.msg);
    }
  }
);

const authenticationSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setGoogleAccessToken(state, action) {
      state.googleAccessToken = action.payload;
      //console.log("GOOGLE", (state.googleAccessToken = action.payload));
    },
    setJwtToken(state, action) {
      state.token = action.payload;
      //console.log("JWT", (state.token = action.payload));
    },
    logoutGoogleAccessToken(state) {
      state.googleAccessToken = null;
    },
    logoutJwtToken(state) {
      state.token = null;
    },
  },

  extraReducers: (builder) => {
    // Register user extra reducer
    builder
      .addCase(signUpUser.pending, (state, { payload }) => {
        state.message = "Check Again if you correctly entered the input field";
        state.loading = true;
        state.token = null;
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = "register success";
      })
      .addCase(signUpUser.rejected, (state, { payload }) => {
        state.message = "Verify credential please";
        state.loading = false;
      });

    // login extra reducer
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.token;
        state.googleAccessToken = null;
        state.isLogged = true;
        ReactNativeAsyncStorage.setItem("jwtToken", payload.token)
      })
      .addCase(signInUser.rejected, (state, { payload }) => {
        state.loading = false;
      });
  },
});

export const {
  setGoogleAccessToken,
  setJwtToken,
  logoutGoogleAccessToken,
  logoutJwtToken,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;

export const selectCurrentJwtToken = (state) => state.auth.token;
export const selectCurrentGoogleAccessToken = (state) =>
  state.auth.googleAccessToken;
