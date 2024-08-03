import { dayProps } from "@/types/weather";
import { CloudRain, Droplet, Thermometer } from "lucide-react";

interface CardWeatherProps {
  info?: dayProps;
}

export const CardWeather = ({ info }: CardWeatherProps) => {
  return (
    <div className="flex flex-col items-start space-y-2 rounded-md bg-foreground/45 p-6 text-background">
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
