import { Profile } from "@/components/profile";

export const Header = () => {
  return (
    <div className="flex w-full items-center justify-between bg-primary p-4 px-6 text-primary-foreground">
      <span className="text-xl font-bold md:text-2xl lg:text-3xl">
        Weather forecast
      </span>
      <Profile />
    </div>
  );
};
