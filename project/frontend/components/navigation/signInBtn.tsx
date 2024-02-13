"use client";
import { DEFAULT_ROUTES } from "@/lib/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";

export default function SignInButton() {
  const pathname = usePathname();

  // Check if pathname starts with "/event/"
  const isEventPage = pathname.startsWith("/event/");

  return (
    <Link
      className={`font-normal cursor-pointer px-2.5 ${buttonVariants({
        size: "sm",
      })}`}
      href={
        isEventPage
          ? `${DEFAULT_ROUTES.LOGIN}?callbackUrl=${encodeURIComponent(
              pathname
            )}`
          : DEFAULT_ROUTES.LOGIN
      }
    >
      Sign In
    </Link>
  );
}

// http://localhost:3000/login?callbackUrl=%2Fbookings
