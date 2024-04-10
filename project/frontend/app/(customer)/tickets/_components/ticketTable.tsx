"use client";
import { getEventById } from "@/lib/api/event";
import { getTicketsByUserId } from "@/lib/api/ticket";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import TicketInfoSheet from "./ticketInfoSheet";

async function updateEventDetails(groupedData: any) {
  for (const item of groupedData) {
    const eventDetails = await getEventById(item.eventDetails.id);
    item.eventDetails = eventDetails;
  }
}

export default function TicketTable({ userId }: { userId: string }) {
  const [formattedPuchasedTickets, setFormattedPuchasedTickets] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const purchasedTickets = await getTicketsByUserId(userId);
        const formattedPuchasedTickets = purchasedTickets.reduce(
          (acc: any, obj: any) => {
            const eventId = obj.event;
            const existingIndex = acc.findIndex(
              (item: any) => item.eventDetails.id === eventId
            );

            if (existingIndex !== -1) {
              acc[existingIndex].ticketPurchase.push(obj);
            } else {
              acc.push({
                eventDetails: { id: eventId },
                ticketPurchase: [obj],
              });
            }

            return acc;
          },
          []
        );
        await updateEventDetails(formattedPuchasedTickets);
        setFormattedPuchasedTickets(formattedPuchasedTickets);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Venue</TableHead>
          <TableHead>Number of Tickets</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {formattedPuchasedTickets.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center capitalize">
              No purchased tickets
            </TableCell>
          </TableRow>
        )}

        {formattedPuchasedTickets.map((item: any, index: number) => {
          return (
            <TableRow key={index}>
              <TableCell>
                <TicketInfoSheet eventData={item}>
                  <span className="font-medium">{item.eventDetails.title}</span>
                </TicketInfoSheet>
              </TableCell>
              <TableCell>
                {format(item.eventDetails.startTime, "MMMM dd, yyyy")}
              </TableCell>
              <TableCell>{item.eventDetails.venue}</TableCell>
              <TableCell>{item.ticketPurchase.length}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
