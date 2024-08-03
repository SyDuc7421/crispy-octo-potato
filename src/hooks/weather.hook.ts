import { weather } from "@/services/weather.service";
import { useMutation } from "react-query";

export const useWeather = () => {
  const {
    mutateAsync: fetchFn,
    data,
    isError,
    isSuccess,
    isLoading,
  } = useMutation(weather);

  return {
    fetchFn,
    data: data?.data.forecast,
    isError,
    isSuccess,
    isLoading,
  };
};
