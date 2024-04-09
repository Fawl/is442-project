import TicketTable from "@/app/(customer)/tickets/_components/ticketTable";
import { authConfig } from "@/auth";
import Navbar from "@/components/navigation/navbar";
import { getServerSession } from "next-auth";

export default async function myTickets() {
  const session = await getServerSession(authConfig);
  const userId = session?.user?.id;

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100dvh-56px)] max-w-[1440px] mx-auto p-4">
        <div className="max-w-7xl mx-auto py-4">
          <h1 className="text-2xl font-semibold tracking-tight mb-4">
            Tickets
          </h1>
          <div className="border rounded-md">
            <TicketTable userId={userId!} />
          </div>
        </div>
      </main>
    </>
  );
}
