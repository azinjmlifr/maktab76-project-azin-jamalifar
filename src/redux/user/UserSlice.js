import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginRequest, refreshTokenRequest } from "../../api/users";
import {
  ACCESS_TOKEN,
  IS_LOGGGED_IN,
  REFRESH_TOKEN,
} from "../../config/constants";

const initialState = {
  error: "",
  isLoggedIn: localStorage.getItem(IS_LOGGGED_IN)
    ? localStorage.getItem(IS_LOGGGED_IN)
    : false,
};

export const login = createAsyncThunk("users/login", (user) => {
  return loginRequest(user)
    .then((response) => {
      console.log(response);
      localStorage.setItem(ACCESS_TOKEN, response.accessToken);
      localStorage.setItem(REFRESH_TOKEN, response.refreshToken);
      localStorage.setItem(IS_LOGGGED_IN, true);
      return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
});

export const refreshToken = createAsyncThunk("users/refreshToken", (user) => {
  return refreshTokenRequest()
    .then((response) => {
      localStorage.setItem(ACCESS_TOKEN, response.accessToken);
      return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("fulfilled", action);
      return { ...state, isLoggedIn: true, error: "" };
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log("rejected", action);
      return {
        error: action.error.message,
        isLoggedIn: false,
      };
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      return {
        error: "",
        isLoggedIn: true,
      };
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      // console.log("rejected");
      return {
        error: action.error.message,
        isLoggedIn: false,
      };
    });
  },
});

export default usersSlice.reducer;
