import { DEFAULT_ROUTES } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { CompassIcon } from "lucide-react";

export default function Navbar() {
  return (
    <div className="sticky top-0 flex items-center justify-between max-w-[1440px] h-14 mx-auto px-4">
      <div className="flex items-center gap-12">
        <Link href={DEFAULT_ROUTES.ROOT}>
          <Image src="/logo.svg" alt="Logo" width={20} height={20} />
        </Link>

        <ul>
          <li>
            <Link
              href={DEFAULT_ROUTES.EXPLORE}
              className="flex items-center text-sm"
            >
              <CompassIcon className="hidden lg:flex lg:mr-1.5" size={16} />
              <span>Explore</span>
            </Link>
          </li>
        </ul>
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
