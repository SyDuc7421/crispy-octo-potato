import { Profile } from "@/components/profile";
import { Button } from "@/components/ui/button";
import { useSubcribe, useUnsubcribe } from "@/hooks/user.hook";
import { useAppSelector } from "@/store/store";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Header = () => {
  const logged_in = Cookies.get("logged_in");
  const isSubcribe = useAppSelector((state) => state.auth.user?.subcribe);
  const [subcribe, setSubcribe] = useState<boolean>(isSubcribe || false);
  const { subcribeFn, isSuccess: subcribeSuccess } = useSubcribe();
  const { unsubcribeFn, isSuccess: unsubcribeSuccess } = useUnsubcribe();

  const onSubcribeHandler = async () => {
    if (!logged_in) {
      toast.error("You must be logged in before performing this action.");
    } else {
      // TODO: Call subcribe API
      if (subcribe) {
        await unsubcribeFn();
      } else {
        {
          await subcribeFn();
        }
      }
    }
  };

  useEffect(() => {
    if (subcribeSuccess) {
      setSubcribe(true);
      toast.success("Subcribe weather notify success");
    }

    if (unsubcribeSuccess) {
      setSubcribe(false);
      toast.info("Unsubcribe weather notify success");
    }
  }, [unsubcribeSuccess, subcribeSuccess]);

  useEffect(() => {
    if (isSubcribe) {
      setSubcribe(isSubcribe);
    }
  }, [isSubcribe]);

  return (
    <div className="flex w-full items-center justify-between bg-primary p-4 px-6 text-primary-foreground">
      <span className="text-xl font-bold md:text-2xl lg:text-3xl">
        Weather forecast
      </span>
      <div className="flex items-center gap-6">
        <Button size="lg" variant="secondary" onClick={onSubcribeHandler}>
          {subcribe ? "Subcribed" : "Subcribe"}
        </Button>
        <Profile />
      </div>
    </div>
  );
};
