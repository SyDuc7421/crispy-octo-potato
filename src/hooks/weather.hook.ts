import { historyWeather, weather } from "@/services/weather.service";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

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

export const usePosition = () => {
  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: -1, longitude: -1 });
  const [error, setError] = useState<string | null>(null);

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition({ latitude, longitude });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError("User denied the request for Geolocation");
              break;

            case error.POSITION_UNAVAILABLE:
              setError("Location information is unavailable");
              break;

            case error.TIMEOUT:
              setError("The request to get user location timed out");
              break;

            default:
              setError("An unknown error occurred");
              break;
          }
        },
      );
    } else {
      setError("Geolocation is not supported by this browser");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return { position, error, getPosition };
};

export const useHistory = () => {
  const {
    data: history,
    isError,
    isSuccess,
    isLoading,
  } = useQuery("fetch/history", historyWeather);

  return {
    history: history?.data.forecast,
    isError,
    isLoading,
    isSuccess,
  };
};
