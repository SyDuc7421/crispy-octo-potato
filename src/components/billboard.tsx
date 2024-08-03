import { currentProps, locationProps } from "@/types/weather";
import {
  Calendar,
  Clock,
  Cloud,
  Droplet,
  Gauge,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface BillboardProps {
  location?: locationProps;
  current?: currentProps;
}

export const Billboard = ({ location, current }: BillboardProps) => {
  const day = location?.localtime.split(" ")[0];
  const time = location?.localtime.split(" ")[1];

  if (!location || !current) {
    return <BillboardSkeleton />;
  }

  return (
    <div className="flex items-center justify-between rounded-md bg-primary p-8 px-12 text-primary-foreground">
      <div className="flex flex-col items-start space-y-4 font-normal">
        <span className="flex items-baseline space-x-6 text-2xl font-bold lg:text-4xl">
          <span> {location?.name}</span>
          <div className="flex items-center space-x-6 text-base font-bold">
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              {day}
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              {time}
            </div>
          </div>
        </span>

        <div className="grid space-y-1 lg:grid-cols-2 lg:gap-4">
          <div className="flex items-center">
            <Thermometer className="mr-1 h-5 w-5" />
            <span>Temperature: {current?.temp_c}&deg;C</span>
          </div>

          <div className="flex items-center">
            <Wind className="mr-1 h-5 w-5" />
            <span>Wind: {current?.wind_kph} kpm</span>
          </div>

          <div className="flex items-center">
            <Droplet className="mr-1 h-5 w-5" />
            <span>Humidity: {current?.humidity}%</span>
          </div>

          <div className="flex items-center">
            <Cloud className="mr-1 h-5 w-5" />
            <span>Cloud: {current?.cloud}%</span>
          </div>

          <div className="flex items-center">
            <Sun className="mr-1 h-5 w-5" />
            <span>UV: {current?.uv}</span>
          </div>

          <div className="flex items-center">
            <Gauge className="mr-1 h-5 w-5" />
            <span>Pressure: {current?.pressure_mb} mb</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center font-medium">
        <img
          src={current?.condition.icon}
          alt="icon"
          className="h-16 w-16 object-cover md:h-24 md:w-24 lg:h-28 lg:w-28"
        />
        <span>{current?.condition.text}</span>
      </div>
    </div>
  );
};

export const BillboardSkeleton = () => {
  return <Skeleton className="h-72 w-full p-16" />;
};
