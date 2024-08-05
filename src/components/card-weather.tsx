import { dayProps } from "@/types/weather";
import { CloudRain, Droplet, Plus, Thermometer } from "lucide-react";
import { toast } from "sonner";

interface CardWeatherProps {
  info?: dayProps;
}

export const CardWeather = ({ info }: CardWeatherProps) => {
  return (
    <div className="flex aspect-[3/4] min-w-44 flex-col items-start space-y-2 rounded-md bg-foreground/45 p-6 text-background">
      <span className="self-center text-center text-xl font-semibold md:text-2xl">
        {info?.date}
      </span>
      <img
        src={info?.condition.icon}
        className="h-6 w-6 self-center md:h-10 md:w-10"
      />

      <div className="flex flex-col space-y-2 text-xs md:text-sm">
        <div className="flex items-center">
          <Thermometer className="mr-2 h-4 w-4" />
          <span>Tempurature: {info?.avgtemp_c}&deg;C</span>
        </div>

        <div className="flex items-center">
          <Droplet className="mr-2 h-4 w-4" />
          <span>Humidity: {info?.avghumidity}%</span>
        </div>

        <div className="flex items-center">
          <CloudRain className="mr-2 h-4 w-4" />
          <span>Rainfall: {info?.totalprecip_mm} mm</span>
        </div>
      </div>
    </div>
  );
};

interface LoadMoreProps {
  days: number;
  setDays: (days: number) => void;
}

export const LoadMoreCard = ({ days, setDays }: LoadMoreProps) => {
  const loadMoreHandler = () => {
    if (days === 14) {
      toast.error("We do not know weather information further than 14 days.");
    } else if (days + 5 > 14) {
      setDays(14);
    } else {
      setDays(days + 5);
    }
  };
  return (
    <div
      className="group flex aspect-[3/4] min-w-44 cursor-pointer flex-col items-center justify-center space-y-2 rounded-md bg-foreground/45 p-6 text-background"
      onClick={loadMoreHandler}
    >
      <div className="flex items-center">
        <Plus className="mr-2 h-12 w-12 opacity-50 transition duration-300 group-hover:opacity-100" />
        <span className="text-base opacity-50 transition duration-300 group-hover:opacity-100">
          Load more
        </span>
      </div>
    </div>
  );
};
