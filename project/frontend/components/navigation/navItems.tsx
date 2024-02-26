"use client";
import { DEFAULT_ROUTES } from "@/lib/routes";
import { CompassIcon, LayoutDashboardIcon, TicketIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavItems() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;

  return (
    <ul className="flex gap-6">
      {userRole === "event_manager" && (
        <li>
          <Link
            href={DEFAULT_ROUTES.DASHBOARD}
            className={`flex items-center text-sm text-muted-foreground hover:text-primary ${
              pathname === DEFAULT_ROUTES.DASHBOARD &&
              "text-primary font-medium"
            }`}
          >
            <LayoutDashboardIcon className="mr-1.5" size={16} />
            <span>Dashboard</span>
          </Link>
        </li>
      )}

      {userRole === "event_manager" && (
        <li>
          <Link
            href={DEFAULT_ROUTES.MY_EVENTS}
            className={`flex items-center text-sm text-muted-foreground hover:text-primary ${
              pathname === DEFAULT_ROUTES.MY_EVENTS &&
              "text-primary font-medium"
            }`}
          >
            <TicketIcon className="mr-1.5" size={16} />
            <span>My Events</span>
          </Link>
        </li>
      )}

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
