import { useEffect, useState } from "react";
import { useMe } from "@/hooks/user.hook";
import { Header } from "@/layouts/header";
import { useAppDispatch } from "@/store/store";
import { setUser } from "@/store/user.slice";
import { Search } from "@/components/search-feild";
import { Dashboard } from "@/components/dashboard";
import { useWeather } from "@/hooks/weather.hook";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { userInfo, isSuccess } = useMe();
  const {
    fetchFn: fetchWeather,
    data: weatherInfo,
    isSuccess: weatherSuccess,
  } = useWeather();
  const [search, setSeach] = useState<string>("");

  const searchHandler = async (search: string) => {
    await fetchWeather({ position: search, days: 5 });
  };

  useEffect(() => {
    if (weatherSuccess && weatherInfo) {
      console.log(weatherInfo);
    }
  }, [isSuccess, weatherInfo]);

  useEffect(() => {
    if (isSuccess && userInfo) {
      dispatch(setUser(userInfo));
    }
  }, [isSuccess]);

  return (
    <div className="min-h-screen w-screen bg-blue-100">
      <Header></Header>
      <div className="grid w-full lg:grid-cols-[1fr_2fr]">
        <Search input={search} setInput={setSeach} onSubmit={searchHandler} />
        <Dashboard
          current={weatherInfo?.current}
          location={weatherInfo?.location}
          forecast={weatherInfo?.forecast}
        />
      </div>
    </div>
  );
};

export default HomePage;
