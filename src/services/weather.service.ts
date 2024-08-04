import { currentProps, dayProps, locationProps } from "@/types/weather";
import axios, { ApiResponse } from "./index";

export type weatherRequestProps = {
  position: string;
  days?: number;
};

export type weatherResponseProps = {
  status: string;
  forecast: forecastProps;
};

export type forecastProps = {
  location: locationProps;
  current: currentProps;
  forecast: {
    forecastday: dayProps[];
  };
};

export const weather = async (data: weatherRequestProps) => {
  const params = new URLSearchParams();
  params.append("position", data.position);
  params.append("days", data.days?.toString() || "1");

  const response: ApiResponse<weatherResponseProps> = await axios.get(
    `/weathers?${params.toString()}`,
  );

  if (response.status !== 200) {
    throw new Error(response.message);
  }
  return response;
};

export const historyWeather = async () => {
  const response: ApiResponse<weatherResponseProps> =
    await axios.get(`/weathers/history`);
  if (response.status !== 200) {
    throw new Error(response.message);
  }
  return response;
};
