import z from "zod";
import { Key, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "@/lib/auth.schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/auth.hook";
import { useEffect } from "react";

interface FormProps {
  setLogin: (value: boolean) => void;
}

export const SignUpForm = ({ setLogin }: FormProps) => {
  const { registerFn, isSuccess } = useRegister();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    await registerFn({ ...values, name: values.username });
  };

  const onFacebookAuth = () => {};
  const onGoogleAuth = () => {};

  useEffect(() => {
    if (isSuccess) {
      setLogin(true);
    }
  }, [isSuccess, setLogin]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex min-w-full flex-col space-y-4 px-4 lg:min-w-[480px]"
      >
        <span className="text-center text-2xl font-semibold uppercase lg:text-3xl">
          SIGN UP
        </span>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    className="ps-8"
                    {...field}
                  />
                  <User className="absolute left-1 top-1/2 h-6 w-6 -translate-y-1/2 stroke-[1.5px] text-primary" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="ps-8"
                    {...field}
                  />
                  <Mail className="absolute left-1 top-1/2 h-6 w-6 -translate-y-1/2 stroke-[1.5px] text-primary" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="ps-8"
                    {...field}
                  />
                  <Key className="absolute left-1 top-1/2 h-6 w-6 -translate-y-1/2 stroke-[1.5px] text-primary" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="capitalize">
          Sign up
        </Button>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex-grow border-b-2 border-gray-400" />
          <span>Or continue with</span>
          <div className="flex-grow border-b-2 border-gray-400" />
        </div>

        <div className="flex w-full items-center justify-between gap-2">
          <Button
            variant="outline"
            className="flex flex-grow items-center"
            onClick={onFacebookAuth}
          >
            <img
              src="./src/assets/svg/facebook.svg"
              alt="facebook-icon"
              className="mr-2 h-5 w-5 object-cover"
            />
            <span>Facebook</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-grow items-center"
            onClick={onGoogleAuth}
          >
            <img
              src="./src/assets/svg/google.svg"
              alt="facebook-icon"
              className="mr-2 h-5 w-5 object-cover"
            />
            <span>Facebook</span>
          </Button>
        </div>
        <span className="w-3/4 self-center text-center text-sm text-foreground/70">
          By clicking continue, you agree to our{" "}
          <Link to="/" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/" className="underline">
            Privacy Policy.
          </Link>
        </span>
      </form>
    </Form>
  );
};
