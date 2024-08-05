import { dayProps } from "@/types/weather";
import { CardWeather, LoadMoreCard } from "./card-weather";
import { Skeleton } from "./ui/skeleton";

interface ForecastProps {
  data?: dayProps[];
  days: number;
  setDays: (days: number) => void;
}

export const Forecast = ({ data, days, setDays }: ForecastProps) => {
  if (!data) {
    return <ForecastSkeleton />;
  }
  return (
    <div className="flex flex-col items-start justify-center">
      <span className="text-xl font-bold md:text-2xl lg:text-3xl">
        {data?.length}-Day forecast
      </span>
      <div className="mt-4 grid w-full grid-cols-2 justify-center justify-items-center gap-4 lg:grid-cols-5">
        {data &&
          data.map((item, index) => <CardWeather key={index} info={item} />)}
        <LoadMoreCard days={days} setDays={setDays} />
      </div>
    </div>
  );
};

export const ForecastSkeleton = () => {
  return (
    <div className="mt-4 grid w-full grid-cols-2 justify-center justify-items-center gap-4 lg:grid-cols-4">
      <Skeleton className="h-72 w-48" />
      <Skeleton className="h-72 w-48" />
      <Skeleton className="h-72 w-48" />
      <Skeleton className="h-72 w-48" />
    </div>
  );
};
