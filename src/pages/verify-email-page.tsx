import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useVerify } from "@/hooks/auth.hook";
import { verifyEmailSchema } from "@/lib/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const VerifyEmailPage = () => {
  const { verifycode } = useParams();
  const navigate = useNavigate();
  const { verifyFn, isSuccess } = useVerify();

  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      verifyCode: verifycode,
    },
  });

  const onSubmit = async (values: z.infer<typeof verifyEmailSchema>) => {
    await verifyFn(values);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth");
    }
  }, [isSuccess]);

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-primary text-primary-foreground">
      <div className="absolute left-4 top-4">
        <Button
          size="icon"
          variant="secondary"
          className="transition duration-300 hover:bg-destructive hover:text-destructive-foreground"
          onClick={() => navigate("/")}
        >
          <X className="h-5 w-5 stroke-2 text-primary transition duration-300 hover:text-white" />
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 rounded-md bg-background p-12 text-foreground"
        >
          <span className="lg:3xl text-xl font-bold uppercase md:text-2xl">
            Verify email address
          </span>
          <FormField
            control={form.control}
            name="verifyCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verify code</FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      type="text"
                      placeholder="Enter your verify code"
                      className="ps-8"
                      {...field}
                    />
                    <Lock className="absolute left-1 top-1/2 h-6 w-6 -translate-y-1/2 stroke-[1.5px] text-primary" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <Button className="flex-grow" type="submit">
            Verify
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default VerifyEmailPage;
