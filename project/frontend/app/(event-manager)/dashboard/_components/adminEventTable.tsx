import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { CancelEventModal } from "./cancel-event-modal";
import { Button } from "../../../../components/ui/button";
import { addHours, format } from "date-fns";

export default function AdminEventTable(eventsData: any) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Name</TableHead>
            <TableHead>Event Date</TableHead>
            <TableHead>No. of Tickets Sold</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {eventsData.eventsData.map((event: any) => {
            return <AdminEventTableItem key={event.id} event={event} />;
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export function AdminEventTableItem({ event }: { event: any }) {
  const utcStart = new Date(event.start);

  // Add 8 hours to convert UTC to Singapore Time (SGT)
  const singaporeTimeOffset = 8;
  const singaporeStart = addHours(utcStart, singaporeTimeOffset);

  // Format the date and time in Singapore Time
  const formattedDate: string = format(singaporeStart, "MMMM d, yyyy");

  return (
    <TableRow className="group">
      <TableCell className="font-medium">
        <Link className="group-hover:underline" href={`/event/${event.id}`}>
          {event.title}
        </Link>
      </TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{event.tickets.length}</TableCell>
      <TableCell>
        {!event.cancelled ? (
          new Date(event.start) < new Date() ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Complete
            </span>
          ) : (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              Active
            </span>
          )
        ) : (
          <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
            Cancelled
          </span>
        )}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="p-2 w-fit h-fit aspect-square">
              <MoreHorizontalIcon size={16} className="text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link className="w-full" href={`/event/${event.id}`}>
                View
              </Link>
            </DropdownMenuItem>
            {new Date(event.start) > new Date() && (
              <DropdownMenuItem>
                <Link className="w-full" href={`/edit-event/${event.id}`}>
                  Edit
                </Link>
              </DropdownMenuItem>
            )}
            {!event.cancelled && new Date(event.start) > new Date() && (
              <DropdownMenuItem asChild>
                <CancelEventModal
                  eventId={event.id}
                  eventName={event.title}
                  className="py-[6px] px-2 w-full text-red-500 hover:bg-accent cursor-pointer text-sm text-left"
                >
                  Cancel
                </CancelEventModal>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
