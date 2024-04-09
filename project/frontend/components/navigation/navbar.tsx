import { authConfig } from "@/auth";
import { DEFAULT_ROUTES } from "@/lib/routes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import NavItems from "./navItems";
import UserAvatar from "./userAvatar";

import { Fjalla_One } from "next/font/google";
const fjalla = Fjalla_One({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400"],
});

export default async function Navbar() {
  const session = await getServerSession(authConfig);

  return (
    <div className="sticky top-0 border-b flex items-center justify-between h-14 bg-white px-4 z-50">
      <div className="flex items-center gap-8 md:gap-12">
        <Link href={DEFAULT_ROUTES.ROOT}>
          <div
            className={`${fjalla.variable} text-xl font-semibold text-[#f05537]`}
          >
            eventx
          </div>
        </Link>
        <NavItems />
      </div>

      <div className="flex items-center gap-4">
        {session !== null ? (
          <UserAvatar userServerSession={session} />
        ) : (
          <div className="flex items-center gap-2">
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href={"/login"}
            >
              Log in
            </Link>
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href={"/register"}
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
