import { Profile } from "@/components/profile";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export const Header = () => {
  return (
    <div className="flex w-full items-center justify-between bg-primary p-4 px-6 text-primary-foreground">
      <span className="text-xl font-bold md:text-2xl lg:text-3xl">
        Weather forecast
      </span>
      <div className="flex items-center gap-6">
        <Button size="icon" className="transition duration-300">
          <Bell className="h-6 w-6 transition duration-300 hover:rotate-12" />
        </Button>
        <Profile />
      </div>
    </div>
  );
};
