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
  if (response.status != 200) {
    throw new Error("Faile to fetch user data");
  }
  return response;
};
