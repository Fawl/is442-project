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

export default function TicketTable() {
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

  const ticket = {
    id: "cewjdiq11",
    price: 100.0,
  };

  const event = {
    title: "Rock Concert",
    venue: "Madison Square Garden",
    cancelled: false,
    price: 100.0,
    startTime: "2024-06-01 19:00:00",
    endTime: "2024-06-01 22:00:00",
    imageLink:
      "https://images.unsplash.com/photo-1619229666372-3c26c399a4cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY5NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4OTIwMTB8&ixlib=rb-4.0.3&q=80&w=1080",
  };
  return (
    <div>
      <Table>
        <TableHeader className="bg-[#f7f7f8]">
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Ticket Info</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="font-semibold text-lg">{event.title}</div>
              <div className="text-gray-500 flex my-1">
                <div className="mx-1">
                  <CalendarCheckIcon width={18} height={18} />
                </div>

                {formatTime(event.startTime)}
              </div>
              <div className="flex text-gray-500 my-1">
                <div className="mx-1">
                  <MapPinIcon width={18} height={18} />
                </div>
                <div>{event.venue}</div>
              </div>
            </TableCell>
            <TableCell>{ticket.id}</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
