import z from "zod";
import { Chrome, Facebook, Key, LoaderCircle, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

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

export const SignUpForm = () => {
  const { registerFn, isSuccess, isLoading } = useRegister();
  const navigate = useNavigate();

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
      navigate("/verifyemail");
    }
  }, [isSuccess]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex min-w-full flex-col space-y-4 px-12 lg:min-w-[480px] lg:p-4"
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
          {!isLoading ? (
            "Sign up"
          ) : (
            <div className="flex items-center">
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading ...</span>
            </div>
          )}
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
            <Facebook className="mr-2 h-4 w-4" />
            <span>Facebook</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-grow items-center"
            onClick={onGoogleAuth}
          >
            <Chrome className="mr-2 h-4 w-4" />
            <span>Google</span>
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
