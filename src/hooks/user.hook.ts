import { getMe, subcribeEmail, unsubcribeEmail } from "@/services/user.service";
import { useMutation, useQuery } from "react-query";

export const useMe = () => {
  const { data, isError, isSuccess, isLoading } = useQuery("fetch/me", getMe);
  return {
    userInfo: data?.data.data.user,
    isError,
    isSuccess,
    isLoading,
  };
};

export const useSubcribe = () => {
  const {
    mutateAsync: subcribeFn,
    data,
    isError,
    isSuccess,
    isLoading,
  } = useMutation(subcribeEmail);
  return {
    subcribeFn,
    userInfo: data?.data.data.user,
    isError,
    isSuccess,
    isLoading,
  };
};

export const useUnsubcribe = () => {
  const {
    mutateAsync: unsubcribeFn,
    data,
    isError,
    isSuccess,
    isLoading,
  } = useMutation(unsubcribeEmail);
  return {
    unsubcribeFn,
    userInfo: data?.data.data.user,
    isError,
    isSuccess,
    isLoading,
  };
};
