import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import { SignInForm } from "@/components/form/sign-in-form";
import { SignUpForm } from "@/components/form/sign-up-form";

const AuthPage = () => {
  const navigate = useNavigate();
  const loggedIn = Cookies.get("logged_in");
  const [login, setLogin] = useState<boolean>(true);

  const onSwitchStateHandler = () => {
    setLogin((prevState) => !prevState);
  };
  if (loggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-background text-foreground">
      {login ? <SignInForm /> : <SignUpForm setLogin={setLogin} />}
      <div className="absolute right-4 top-4">
        <Button
          size="lg"
          variant="outline"
          className="capitalize text-primary hover:text-primary/75"
          onClick={onSwitchStateHandler}
        >
          {login ? "Sign up" : "Sign in"}
        </Button>
      </div>
      <div className="absolute left-4 top-4">
        <Button
          size="icon"
          variant="secondary"
          className="transition duration-300 hover:bg-destructive hover:text-destructive-foreground"
          onClick={() => navigate("/")}
        >
          <X className="h-5 w-5 stroke-2 text-primary hover:text-destructive-foreground" />
        </Button>
      </div>
    </div>
  );
};

export default AuthPage;
