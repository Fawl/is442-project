"use client";
import { DEFAULT_ROUTES } from "@/lib/routes";
import { CompassIcon, TicketIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavItems() {
  const pathname = usePathname();
  const session = useSession();
  const userRole = session?.data?.user?.role;

  return (
    <ul className="flex gap-6">
      <li>
        <Link
          href={DEFAULT_ROUTES.EXPLORE}
          className={`flex items-center text-sm text-muted-foreground hover:text-primary ${
            pathname === DEFAULT_ROUTES.EXPLORE && "text-primary font-medium"
          }`}
        >
          <CompassIcon className="mr-1.5" size={16} />
          <span>Explore</span>
        </Link>
      </li>

      {userRole === "event_manager" && (
        <li>
          <Link
            href={DEFAULT_ROUTES.CREATE_EVENT}
            className={`flex items-center text-sm text-muted-foreground hover:text-primary ${
              pathname === DEFAULT_ROUTES.CREATE_EVENT &&
              "text-primary font-medium"
            }`}
          >
            <TicketIcon className="mr-1.5" size={16} />
            <span>Create Event</span>
          </Link>
        </li>
      )}
    </ul>
  );
}
