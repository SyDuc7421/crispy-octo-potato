import { login, register, verify } from "@/services/auth.service";
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
  } = useMutation(register, {
    onError: (error: any) => {
      toast.error(`Register failed: ${error.message}`);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        "Registration successful, Verify code has been sent to your email",
      );
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
  } = useMutation(login, {
    onError: (error: any) => {
      toast.error(`Login failed: ${error.message}`);
    },
  });

  useEffect(() => {
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

export const useVerify = () => {
  const {
    mutateAsync: verifyFn,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(verify, {
    onError: (error: any) => {
      toast.error(`Verify failed: ${error.message}`);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Verify email successfully");
    }
  }, [isSuccess]);
  return {
    verifyFn,
    isLoading,
    isSuccess,
    isError,
  };
};
