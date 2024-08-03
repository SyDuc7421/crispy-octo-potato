import { useMe } from "@/hooks/user.hook";
import { Header } from "@/layouts/header";
import { useAppDispatch } from "@/store/store";
import { setUser } from "@/store/user.slice";
import { useEffect } from "react";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { userInfo, isSuccess } = useMe();

  useEffect(() => {
    if (isSuccess && userInfo) {
      dispatch(setUser(userInfo));
    }
  }, [isSuccess]);

  return (
    <div className="h-screen w-screen">
      <Header></Header>
      <span>Content</span>
    </div>
  );
};

export default HomePage;
