import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Profile = () => {
  const navigte = useNavigate();
  return (
    <Button
      variant="secondary"
      size="lg"
      className="capitalize"
      onClick={() => navigte("/auth")}
    >
      Sign in
    </Button>
  );
};
