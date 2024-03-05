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
import { Button } from "../ui/button";
import Link from "next/link";

export default function AdminEventTable(eventsData: any) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Name</TableHead>
            <TableHead>No. of Tickets Sold</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {eventsData.eventsData.map((event: any) => {
            return <AdminEventTableItem key={event.eventId} event={event} />;
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export function AdminEventTableItem({ event }: { event: any }) {
  return (
    <TableRow className="group">
      <TableCell className="font-medium">
        <Link className="group-hover:underline" href={`/event/${event.id}`}>
          {event.title}
        </Link>
      </TableCell>
      <TableCell>123</TableCell>
      <TableCell>
        {!event.cancelled ? (
          <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
            Active
          </span>
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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Cancel</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
