import { login, register } from "@/services/auth.service";
import { toast } from "sonner";
import { useMutation } from "react-query";
import { logout } from "@/services";
import { useEffect } from "react";

export const useRegister = () => {
  const {
    mutateAsync: registerFn,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(register);

  useEffect(() => {
    if (isError) {
      toast.error("Registration failed");
    }
    if (isSuccess) {
      toast.success("Registration successfully");
    }
  }, [isSuccess, isError]);

  return {
    registerFn,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useLogin = () => {
  const {
    mutateAsync: loginFn,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(login);

  useEffect(() => {
    if (isError) {
      toast.error("Login failed");
    }
    if (isSuccess) {
      toast.success("Logged in successfully");
    }
  }, [isSuccess, isError]);

  return {
    loginFn,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useLogout = () => {
  const {
    mutateAsync: logoutFn,
    isSuccess,
    isError,
    isLoading,
  } = useMutation(logout);

  useEffect(() => {
    if (isError) {
      toast.error("Logout failed");
    }
    if (isSuccess) {
      toast.success("Logged out successfully");
    }
  }, [isSuccess, isError]);
  return {
    logoutFn,
    isLoading,
    isSuccess,
    isError,
  };
};
