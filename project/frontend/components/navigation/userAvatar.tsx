"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { getUserById } from "@/lib/api/user";
import { useEffect, useState } from "react";

const getUserData = async (userId: string) => {
  const data = await getUserById(userId);
  return data;
};

export default function UserAvatar({
  userServerSession,
}: {
  userServerSession: any;
}) {
  const session = userServerSession || useSession();
  const userRole = session.user?.role;
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (session.user?.id) {
        const res = await getUserData(session.user?.id);
        setUserData(res);
      }
    };
    fetchData();
  }, [session.user?.id]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer">
          {session.user?.image !== null && (
            <AvatarImage src={session.user?.image} />
          )}
          <AvatarFallback>{session.user?.email?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-[200px] w-full" align="end">
        <DropdownMenuLabel className="font-semibold">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userRole === "customer" && (
          <>
            <DropdownMenuItem>
              <Link href="/tickets" className="w-full">
                Tickets
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {/* @ts-ignore */}
              Credit: ${userData.balance} left
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
