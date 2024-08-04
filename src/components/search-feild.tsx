import { KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { usePosition } from "@/hooks/weather.hook";
import { LoaderCircle } from "lucide-react";

interface SearchFeildProps {
  input: string;
  setInput: (input: string) => void;
  onSubmit: (search: string) => void;
  isLoading: boolean;
}

export const Search = ({
  input,
  setInput,
  onSubmit,
  isLoading,
}: SearchFeildProps) => {
  const { getPosition, position } = usePosition();

  const currentLocationHandler = () => {
    getPosition();
    if (position.latitude !== -1 && position.longitude !== -1) {
      onSubmit(`${position.latitude} ${position.longitude}`);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && input.length >= 3) {
      onSubmit(input);
    }
  };
  return (
    <div className="h-fit w-full p-8 lg:h-full">
      <div className="flex flex-col space-y-6">
        <span className="text-base font-semibold tracking-tight lg:text-2xl">
          Enter a City Name
        </span>
        <Input
          value={input}
          className="bg-background text-foreground"
          placeholder="E.g., New York, London, Lodon"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button type="button" onClick={() => onSubmit(input)}>
          {isLoading ? (
            <div className="flex items-center">
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading ...</span>
            </div>
          ) : (
            "Search"
          )}
        </Button>
      </div>
      <div className="my-2 flex items-center gap-2">
        <div className="flex-grow border-b-2 border-foreground/30" />
        <span>or</span>
        <div className="flex-grow border-b-2 border-foreground/30" />
      </div>
      <Button
        variant="outline"
        className="w-full flex-grow capitalize"
        onClick={() => currentLocationHandler()}
      >
        Use Current Location
      </Button>
    </div>
  );
};
