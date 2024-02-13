import { authConfig } from "@/auth";
import EventAdminTabs from "@/components/navigation/eventAdminTabs";
import Navbar from "@/components/navigation/navbar";
import { getServerSession } from "next-auth";

export default async function SpecificEventLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { eventId: string };
}) {
  const session = await getServerSession(authConfig);
  const userRole = session?.user?.role;

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100dvh-56px)] max-w-[1440px] mx-auto p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {userRole === "event_manager" ||
            (userRole === "ticket_officer" && (
              <EventAdminTabs eventId={params.eventId} />
            ))}
          <>{children}</>
        </div>
      </main>
    </>
  );
}
