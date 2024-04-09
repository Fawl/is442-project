"use client";
import { useForm } from "react-hook-form";
import { any, z } from "zod";
import { RegisterFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

// COMPONENTS
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createUser } from "@/lib/api/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterForm({
  userType = "customer", // DEFAULT VALUE IF NOT PROVIDED
  isMangerSignUpCallback,
}: {
  userType?: "customer" | "ticket_officer" | "event_manager";
  isMangerSignUpCallback?: () => void;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = async (data: any) => {
    try {
      const response = await createUser({
        name: data.name,
        email: data.email,
        password_hash: data.password,
        user_type: userType,
      });
      if (response.ok) {
        toast.success("User created successfully");
        if (userType === "customer") {
          router.push("/login");
          router.refresh();
        } else {
          // IF USER TYPE IS TICKET OFFICER
          if (isMangerSignUpCallback) {
            isMangerSignUpCallback();
          }
          router.refresh();
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleOnSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="text-gray-800">Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Name"
                    className="focus-visible:ring-1 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage className="font-normal" />
              </FormItem>
            )}
          />

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
                    className="focus-visible:ring-1 focus-visible:ring-offset-0"
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
                    className="focus-visible:ring-1 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage className="font-normal" />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full capitalize">
          Create an account
        </Button>
      </form>
    </Form>
  );
}
