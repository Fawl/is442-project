import { authConfig } from "@/auth";
import { DEFAULT_ROUTES } from "@/lib/routes";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import NavItems from "./navItems";
import SignInButton from "./signInBtn";
import UserAvatar from "./userAvatar";

export default async function Navbar() {
  const session = await getServerSession(authConfig);

  return (
    <div className="sticky top-0 flex items-center justify-between max-w-[1440px] h-14 mx-auto px-4 z-50">
      <div className="flex items-center gap-8 md:gap-12">
        <Link href={DEFAULT_ROUTES.ROOT}>
          <Image src="/logo.svg" alt="Logo" width={20} height={20} />
        </Link>

        <NavItems />
      </div>

      {session !== null ? (
        <UserAvatar userServerSession={session} />
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
