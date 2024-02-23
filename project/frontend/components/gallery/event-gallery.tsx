"use client";
import { TicketedEvent } from "@/types";
import Link from "next/link";
import EventCard from "../cards/event-card";

export default function EventGallery({ events }: { events: TicketedEvent[] }) {
  return (
    <>
      {events.length > 0 ? (
        events.map((event) => (
          <Link href={`/event/${event.id}`} key={event.id}>
            <EventCard event={event} />
          </Link>
        ))
      ) : (
        <>No result</>
      )}
    </>
  );
}
