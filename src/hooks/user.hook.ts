import { getMe } from "@/services/user.service";
import { useQuery } from "react-query";

export const useMe = () => {
  const { data, isError, isSuccess, isLoading } = useQuery("fetch/me", getMe);
  return {
    userInfo: data?.data.data.user,
    isError,
    isSuccess,
    isLoading,
  };
};
