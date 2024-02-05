import RegisterForm from "@/components/forms/register-form";
import { buttonVariants } from "@/components/ui/button";
import { DEFAULT_ROUTES } from "@/lib/routes";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="relative min-h-dvh flex items-center justify-center">
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold">Create an account</h1>
          <div className="text-sm text-muted-foreground">
            Just a few clicks and you're in - ready to explore a world of
            possibilities tailored for you.
          </div>
        </div>
        <RegisterForm />
        <div className="text-sm text-center text-muted-foreground">
          By continuing, you acknowledge that you have read and agree to our{" "}
          <span className="font-medium text-primary">Terms</span> and{" "}
          <span className="font-medium text-primary">Privacy Policy</span>.
        </div>
      </div>

      <Link
        className={`${buttonVariants({
          size: "sm",
          variant: "secondary",
        })} absolute top-4 right-4 px-2.5 text-sm text-muted-foreground hover:text-primary`}
        href={DEFAULT_ROUTES.LOGIN}
      >
        Back to login
      </Link>
    </div>
  );
}
