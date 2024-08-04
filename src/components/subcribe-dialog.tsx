import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useSubcribe } from "@/hooks/user.hook";
import { toast } from "sonner";
import Cookies from "js-cookie";

export const SubcribeButton = () => {
  const logged_in = Cookies.get("logged_in");
  const [input, setInput] = useState<string>("");
  const { subcribeFn, isSuccess } = useSubcribe();

  const onSubmit = async (value: string) => {
    if (!logged_in) {
      toast.error("You must be logged in before performing this action.");
    } else {
      await subcribeFn({ location: value });
      setInput("");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.info("Subcribe weather notify success");
    }
  }, [isSuccess]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="secondary">
          Subcribe
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter your location</DialogTitle>
          <DialogDescription>
            Enter your address to receive daily email notifications
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Entern your location"
          />
          <DialogClose asChild>
            <Button
              type="button"
              onClick={() => onSubmit(input)}
              className="self-stretch"
            >
              Subcribe
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
