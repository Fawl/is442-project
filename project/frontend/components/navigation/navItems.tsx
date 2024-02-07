"use client";
import { DEFAULT_ROUTES } from "@/lib/routes";
import { CompassIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavItems() {
  const NavItems = {
    explore: {
      icon: CompassIcon,
      text: "Explore",
      link: DEFAULT_ROUTES.EXPLORE,
    },
  };

  const pathname = usePathname();

  return (
    <ul>
      {Object.values(NavItems).map((item) => (
        <li key={item.link}>
          <Link
            href={item.link}
            className={`flex items-center text-sm text-muted-foreground hover:text-primary ${
              pathname === item.link && "text-primary font-medium"
            }`}
          >
            <>
              {React.createElement(item.icon, {
                className: "mr-1.5",
                size: 16,
              })}
              <span>{item.text}</span>
            </>
          </Link>
        </li>
      ))}
    </ul>
  );
}
