import { LOGIN_URL, REFRESH_TOKEN_URL } from "../config/api";
import axiosInstance from "./http";

export const loginRequest = async (user) => {
  try {
    const response = await axiosInstance.post(LOGIN_URL, user);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const refreshTokenRequest = async () => {
  try {
    const response = await axiosInstance.post(REFRESH_TOKEN_URL);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
