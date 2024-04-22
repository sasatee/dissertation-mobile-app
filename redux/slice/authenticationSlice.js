import { BASE_URL } from "@env";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  token: null,
  isLogged: false,
  loading: true,
  googleAccessToken: null,
  isDoctor: {},
};

export const signUpUser = createAsyncThunk(
  "user/register",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        BASE_URL + "/api/v1/auth/register",
        body
      );
      console.log("sffsffsffs",data);
      return data;
    } catch (error) {
            console.log("sffsffsffs",data);
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
        //"https://cc18-102-117-134-154.ngrok-free.app/api/v1/auth/login",
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
    },
    setJwtToken(state, action) {
      state.token = action.payload;
    },
    setIsDoctor(state, action) {
      state.isDoctor = action.payload.user.isDoctor;
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
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(signUpUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.isLogged = false;
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
        state.isDoctor = payload.isDoctor;
        ReactNativeAsyncStorage.setItem("jwtToken", payload.token);
      })
      .addCase(signInUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.isLogged = false;
      });
  },
});

export const {
  setGoogleAccessToken,
  setJwtToken,
  logoutGoogleAccessToken,
  logoutJwtToken,
  setIsDoctor,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;

export const selectCurrentJwtToken = (state) => state.auth.token;
export const selectCurrentGoogleAccessToken = (state) =>
  state.auth.googleAccessToken;
export const checkIsDoctorLogin = (state) => state.auth.isDoctor;
