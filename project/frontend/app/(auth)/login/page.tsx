import LoginForm from "@/components/forms/login-form";
import { DEFAULT_ROUTES } from "@/lib/routes";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold">Welcome Back</h1>
          <div className="text-sm text-muted-foreground">
            Enter your email and password to access your account
          </div>
        </div>
        <LoginForm />
        <div className="text-sm text-center text-muted-foreground">
          Don't have an account?{" "}
          <Link
            className="font-medium text-primary"
            href={DEFAULT_ROUTES.SIGNUP}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
