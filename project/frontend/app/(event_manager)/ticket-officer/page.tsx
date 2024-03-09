import NewTicketOfficerModal from "@/components/modal/new-ticket-officer-modal";
import AdminTicketOfficerTable from "@/components/table/adminTicketOfficerTable";
import { Button } from "@/components/ui/button";
import { getAllUser } from "@/lib/api/user";

export default async function AddTicketOfficerPage() {
  const userResponse = await getAllUser();

  const ticketOfficers = userResponse.filter(
    (user: any) => user.user_type === "ticket_officer"
  );

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium tracking-tight">
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
