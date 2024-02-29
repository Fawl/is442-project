"use client";
import { LoginFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// COMPONENTS
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (response && response.ok) {
        {
          searchParams.get("callbackUrl")
            ? router.replace(callbackUrl)
            : router.replace("/");
        }
        router.refresh();
      }
      if (response && response.error) {
        toast.error(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleOnSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="text-gray-800">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Email Address"
                    className={cn(
                      "w-full pl-3 text-left font-normal focus-visible:ring-1 focus-visible:ring-offset-0",
                      !field.value && "text-muted-foreground",
                      form.formState.errors.email?.message &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                </FormControl>
                <FormMessage className="font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="text-gray-800">Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Password"
                    className={cn(
                      "w-full pl-3 text-left font-normal focus-visible:ring-1 focus-visible:ring-offset-0",
                      !field.value && "text-muted-foreground",
                      form.formState.errors.password?.message &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                </FormControl>
                <FormMessage className="font-normal" />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  );
}
