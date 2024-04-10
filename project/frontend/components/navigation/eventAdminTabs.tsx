"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EventAdminTabs({ eventId }: { eventId: string }) {
  const pathname = usePathname();

  return (
    <div className="text-sm font-normal text-center text-gray-500 border-b border-gray-200">
      <ul className="flex flex-wrap -mb-px">
        <li className="me-2">
          <Link
            href={`/event/${eventId}`}
            className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ${
              pathname === `/event/${eventId}` &&
              "text-[#0977aa] font-medium border-[#0977aa]"
            }`}
          >
            Overview
          </Link>
        </li>
        <li className="me-2">
          <Link
            href={`/event/${eventId}/insights`}
            className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ${
              pathname === `/event/${eventId}/insights` &&
              "text-[#0977aa] font-medium border-[#0977aa]"
            }`}
          >
            Insights
          </Link>
        </li>
      </ul>
    </div>
  );
}
