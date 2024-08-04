import axios, { ApiResponse } from "./index";
import { IUser } from "@/types/user";

export type getMeResponseProps = {
  status: string;
  data: {
    user: IUser;
  };
};

export const getMe = async () => {
  const response: ApiResponse<getMeResponseProps> =
    await axios.get("/users/me");
  if (response.status !== 200) {
    throw new Error(response.message);
  }
  return response;
};

export const subcribeEmail = async () => {
  const response: ApiResponse<getMeResponseProps> =
    await axios.get("/users/subcribe");
  if (response.status !== 200) {
    throw new Error(response.message);
  }
  return response;
};

export const unsubcribeEmail = async () => {
  const response: ApiResponse<getMeResponseProps> =
    await axios.get("/users/unsubcribe");
  if (response.status !== 200) {
    throw new Error(response.message);
  }
  return response;
};
