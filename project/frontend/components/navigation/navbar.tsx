import { DEFAULT_ROUTES } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { CompassIcon } from "lucide-react";
import NavItems from "./navItems";

export default function Navbar() {
  return (
    <div className="sticky top-0 flex items-center justify-between max-w-[1440px] h-14 mx-auto px-4 z-50">
      <div className="flex items-center gap-8 md:gap-12">
        <Link href={DEFAULT_ROUTES.ROOT}>
          <Image src="/logo.svg" alt="Logo" width={20} height={20} />
        </Link>

        <NavItems />
      </div>

      <Link
        className={`${buttonVariants({
          size: "sm",
        })}, font-normal px-2.5`}
        href={DEFAULT_ROUTES.LOGIN}
      >
        Sign In
      </Link>
    </div>
  );
}
