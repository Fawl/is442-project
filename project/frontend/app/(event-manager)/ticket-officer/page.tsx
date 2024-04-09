import NewTicketOfficerModal from "@/app/(event-manager)/ticket-officer/_components/new-ticket-officer-modal";
import AdminTicketOfficerTable from "@/app/(event-manager)/ticket-officer/_components/adminTicketOfficerTable";
import { Button } from "@/components/ui/button";
import { getAllUser } from "@/lib/api/user";

export default async function AddTicketOfficerPage() {
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
        <NewTicketOfficerModal>
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
