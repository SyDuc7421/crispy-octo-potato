import axios from "axios";
import Cookies from "js-cookie";
import { refresh } from "./auth.service";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE",
  },
});

export type SuccessResponse<T> = {
  status: number;
  data: T;
};

export type ErrorResponse = {
  status: number;
  error: string;
  message: string;
};
export type ApiResponse<T> = SuccessResponse<T> & ErrorResponse;

instance.interceptors.request.use(
  function (config) {
    const access_token = Cookies.get("access_token");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { response, config } = error;

    if (response.status === 401 || response.status === 403) {
      if (window.location.pathname !== "/auth") {
        await refresh(); // Call refresh if access token is expired and url !== auth
        return instance.request(config);
      }
    }

    const error_response: ErrorResponse = {
      status: response.status,
      error: response.data.error,
      message: response.data.message,
    };
    return error_response;
  },
);

export const logout = async () => {
  const response: ApiResponse<{ message: string }> =
    await instance.get("/auth/logout");
  if (response.status == 200) {
    return response;
  }
  throw new Error("Logout failed");
};

export default instance;
