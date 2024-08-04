import { useEffect, useState } from "react";
import { useMe } from "@/hooks/user.hook";
import { Header } from "@/layouts/header";
import { useAppDispatch } from "@/store/store";
import { setUser } from "@/store/user.slice";
import { Search } from "@/components/search-feild";
import { Dashboard } from "@/components/dashboard";
import { useHistory, useWeather } from "@/hooks/weather.hook";
import { forecastProps } from "@/services/weather.service";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { userInfo, isSuccess: isUserSuccess } = useMe();
  const {
    fetchFn: fetchWeather,
    data: weatherInfo,
    isSuccess: isWeatherSuccess,
    isLoading,
  } = useWeather();
  const { history, isSuccess: isHistorySuccess } = useHistory();

  const [search, setSeach] = useState<string>("");
  const [data, setData] = useState<forecastProps | undefined>();

  const searchHandler = async (search: string) => {
    await fetchWeather({ position: search, days: 5 });
  };

  useEffect(() => {
    if (isHistorySuccess && history) {
      setData(history);
    }
  }, [isHistorySuccess, history]);

  useEffect(() => {
    if (isWeatherSuccess && weatherInfo) {
      setData(weatherInfo);
    }
  }, [isWeatherSuccess, weatherInfo]);

  useEffect(() => {
    if (isUserSuccess && userInfo) {
      dispatch(setUser(userInfo));
    }
  }, [isUserSuccess, userInfo]);

  return (
    <div className="min-h-screen w-screen bg-blue-100">
      <Header></Header>
      <div className="grid w-full lg:grid-cols-[1fr_2fr]">
        <Search
          input={search}
          setInput={setSeach}
          onSubmit={searchHandler}
          isLoading={isLoading}
        />
        <Dashboard
          current={data?.current}
          location={data?.location}
          forecast={data?.forecast}
        />
      </div>
    </div>
  );
};

export default HomePage;
