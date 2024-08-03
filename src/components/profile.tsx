import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HelpCircle, Settings, User } from "lucide-react";
import Cookies from "js-cookie";
import { useLogout } from "@/hooks/auth.hook";
import { useMe } from "@/hooks/user.hook";

export const Profile = () => {
  const logged_in = Cookies.get("logged_in");
  const { logoutFn } = useLogout();
  const { userInfo } = useMe();
  const navigte = useNavigate();

  return (
    <>
      {!logged_in ? (
        <Button
          size="lg"
          variant="secondary"
          className="capitalize"
          onClick={() => navigte("/auth")}
        >
          Sign in
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-8 w-8 rounded-full bg-background text-base font-bold text-foreground lg:h-10 lg:w-10 lg:text-xl">
              A
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="flex min-w-[160px] flex-col justify-center space-y-2"
            align="end"
          >
            <DropdownMenuLabel>{userInfo?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex cursor-pointer items-center hover:bg-foreground/10"
              onClick={() => {}}
            >
              <User className="mr-2 h-5 w-5" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex cursor-pointer items-center hover:bg-foreground/10"
              onClick={() => {}}
            >
              <Settings className="mr-2 h-5 w-5" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex cursor-pointer items-center hover:bg-foreground/10"
              onClick={() => {}}
            >
              <HelpCircle className="mr-2 h-5 w-5" />
              <span>Help</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button
                className="flex-grow cursor-pointer p-2 capitalize"
                onClick={() => logoutFn()}
              >
                Log out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
