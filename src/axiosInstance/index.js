import axios, { AxiosRequestConfig } from "axios";

export function getJWTHeader(user) {
  if (user?.accessToken) {
    return { Authorization: `Bearer ${user.accessToken}` };
  } else {
    const jwt = sessionStorage.getItem("cloud_user");
    return { Authorization: `Bearer ${JSON.parse(jwt).accessToken}` };
  }
}

// const AxiosRequestConfig = { baseUrl };
// @ts-nocheck
// export const axiosInstance = axios.AxiosRequestConfig(baseUrl);
