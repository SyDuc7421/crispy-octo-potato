import { Profile } from "@/components/profile";
import { SubcribeButton } from "@/components/subcribe-dialog";
import { Button } from "@/components/ui/button";
import { useUnsubcribe } from "@/hooks/user.hook";
import { useAppSelector } from "@/store/store";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Header = () => {
  const logged_in = Cookies.get("logged_in");
  const isSubcribe = useAppSelector((state) => state.auth.user?.subcribe);
  const [subcribe, setSubcribe] = useState<boolean>(isSubcribe || false);
  const { unsubcribeFn, isSuccess: unsubcribeSuccess } = useUnsubcribe();

  const onSubcribeHandler = async () => {
    if (!logged_in) {
      toast.error("You must be logged in before performing this action.");
    } else {
      // TODO: Call subcribe API
      if (subcribe) {
        await unsubcribeFn();
      }
    }
  };

  useEffect(() => {
    if (unsubcribeSuccess) {
      setSubcribe(false);
      toast.info("Unsubcribe weather notify success");
    }
  }, [unsubcribeSuccess]);

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
        {!logged_in ? (
          <Button size="lg" variant="secondary" onClick={onSubcribeHandler}>
            Subcribe
          </Button>
        ) : subcribe ? (
          <Button size="lg" variant="secondary" onClick={onSubcribeHandler}>
            Subcribed
          </Button>
        ) : (
          <SubcribeButton />
        )}

        <Profile />
      </div>
    </div>
  );
};
