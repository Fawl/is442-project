import NewTicketOfficerModal from "@/app/(event-manager)/ticket-officer/_components/new-ticket-officer-modal";
import AdminTicketOfficerTable from "@/app/(event-manager)/ticket-officer/_components/adminTicketOfficerTable";
import { Button } from "@/components/ui/button";
import { getAllUser } from "@/lib/api/user";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";

export default async function AddTicketOfficerPage() {
  const session = await getServerSession(authConfig);
  const userId = session?.user?.id;

  const userResponse = await getAllUser();

  const ticketOfficers = userResponse.filter(
    (user: any) => user.user_type === "ticket_officer"
  );

  return (
    <div className="py-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Manage Ticket Officer
        </h1>
        <NewTicketOfficerModal emId={userId!}>
          <Button className="font-normal" size="sm">
            New Ticker Officer
          </Button>
        </NewTicketOfficerModal>
      </div>
      <div className="border rounded-md">
        <AdminTicketOfficerTable data={ticketOfficers} />
      </div>
    </div>
  );
}
