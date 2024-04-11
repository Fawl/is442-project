"use client";
import { DEFAULT_ROUTES } from "@/lib/routes";
import {
  LayoutDashboardIcon,
  TicketIcon,
  User2Icon,
  Users2Icon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        <>
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

          <li>
            <Link
              href={DEFAULT_ROUTES.TICKET_OFFICER}
              className={`flex items-center text-sm text-muted-foreground hover:text-primary ${
                pathname === DEFAULT_ROUTES.TICKET_OFFICER &&
                "text-primary font-medium"
              }`}
            >
              <Users2Icon className="mr-1.5" size={16} />
              <span>Manage Ticket Officer</span>
            </Link>
          </li>
        </>
      )}

      {userRole ==="ticket_officer" &&(
        <>
          <li>
          <Link
              href={DEFAULT_ROUTES.CHECK_TICKET}
              className={`flex items-center text-sm text-muted-foreground hover:text-primary ${
                pathname === DEFAULT_ROUTES.CHECK_TICKET &&
                "text-primary font-medium"
              }`}
            >
              <TicketIcon className="mr-1.5" size={16} />
              <span>Check Ticket Validity</span>
            </Link>
          </li>
        </>
      )

      }
    </ul>
  );
}
