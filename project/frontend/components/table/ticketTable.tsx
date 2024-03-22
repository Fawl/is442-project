import { CalendarCheckIcon, MapPinIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";
import { getTicketsByUserId } from "@/lib/api/ticket";
import { getEventById } from "@/lib/api/event";

export default async function TicketTable() {
  const session = await getServerSession(authConfig);
  const userId = session?.user?.id;

  const purchasedTickets = await getTicketsByUserId(userId);

  const formatTime = (dateString: any) => {
    return new Date(dateString).toLocaleTimeString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  let EventTicket = [];
  for (let tix of purchasedTickets) {
    const event = await getEventById(tix.event);
    EventTicket.push({ tix, event });
  }
  EventTicket.sort((a, b) => {
    // Access the event start time from each item in EventTicket
    const startTimeA = new Date((a.event as any).startTime);
    const startTimeB = new Date((b.event as any).startTime);
    
    // Compare the event start times for sorting
    return startTimeA.getTime() - startTimeB.getTime();
  });
 
  
  return (
    <div>
      <Table>
        <TableHeader className="bg-[#f7f7f8]">
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Ticket ID</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {EventTicket.map((tick) => (
            <TableRow>
              <TableCell>
                <div className="font-semibold text-lg">{tick.event.title}</div>
                <div className="text-gray-500 flex my-1">
                  <div className="mx-1">
                    <CalendarCheckIcon width={18} height={18} />
                  </div>
                  {formatTime(tick.event.startTime)}
                </div>
                <div className="flex text-gray-500 my-1">
                  <div className="mx-1">
                    <MapPinIcon width={18} height={18} />
                  </div>
                  <div>{tick.event.venue}</div>
                </div>
              </TableCell>
              <TableCell>{tick.tix.id}</TableCell>
              <TableCell className="text-right">${tick.tix.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
