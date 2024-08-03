import axios from "axios";
import { ApiResponse, ErrorResponse } from "./index";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth`,
  withCredentials: true,
});

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { response } = error;
    const error_response: ErrorResponse = {
      status: response.status,
      error: response.data.error,
      message: response.data.message,
    };
    return error_response;
  },
);

// login API
export type loginRequestProps = {
  email: string;
  password: string;
};

export type loginResponseProps = {
  status: string;
  accessToken: string;
};

export const login = async (data: loginRequestProps) => {
  const response: ApiResponse<loginResponseProps> = await instance.post(
    "/login",
    data,
  );
  if (response.status != 200) {
    throw new Error("Login failed");
  }
  return response;
};

// sign up API
export type registerRequestProps = {
  name: string;
  email: string;
  password: string;
};

export type registerResponseProps = {
  id: string;
  name: string;
  email: string;
};

export const register = async (data: registerRequestProps) => {
  const response: ApiResponse<registerResponseProps> = await instance.post(
    "/register",
    data,
  );
  if (response.status != 201) {
    throw new Error("Registration failed");
  }
  return response;
};

export type refreshResponseProps = {
  status: string;
  access_token: string;
};
export const refresh = async () => {
  const response = await instance.get("/refresh");
  if (response.status != 200) {
    throw new Error("Registration failed");
  }
  return response;
};
