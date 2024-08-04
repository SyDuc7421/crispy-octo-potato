import { useEffect } from "react";
import { Key, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { signInFormSchema } from "@/lib/auth.schema";

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
import { useLogin } from "@/hooks/auth.hook";

export const SignInForm = () => {
  const { loginFn, isSuccess } = useLogin();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    await loginFn(values);
  };

  const onFacebookAuth = () => {};
  const onGoogleAuth = () => {};
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex min-w-full flex-col space-y-4 px-12 lg:min-w-[480px] lg:p-4"
      >
        <span className="text-center text-2xl font-semibold uppercase lg:text-3xl">
          SIGN IN
        </span>
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
          Sign in
        </Button>

        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-sm opacity-55 transition duration-300 hover:underline hover:opacity-100"
          >
            Forgot your password?
          </Link>
          <Link
            to="/verifyemail"
            className="text-sm opacity-55 transition duration-300 hover:underline hover:opacity-100"
          >
            Verify your email?
          </Link>
        </div>
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
      </form>
    </Form>
  );
};
