import { Profile } from "@/components/profile";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "sonner";

export const Header = () => {
  const [subcribe, setSubcribe] = useState<boolean>(false);
  const logged_in = Cookies.get("logged_in");

  const onSubcribeHandler = () => {
    if (!logged_in) {
      toast.error("You must be logged in before performing this action.");
    } else {
      setSubcribe((preState) => !preState);
      // TODO: Call subcribe API
    }
  };

  return (
    <div className="flex w-full items-center justify-between bg-primary p-4 px-6 text-primary-foreground">
      <span className="text-xl font-bold md:text-2xl lg:text-3xl">
        Weather forecast
      </span>
      <div className="flex items-center gap-6">
        <Button size="lg" variant="secondary" onClick={onSubcribeHandler}>
          {subcribe ? "Unsubcribe" : "Subcribe"}
        </Button>
        <Profile />
      </div>
    </div>
  );
};
