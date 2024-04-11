import EventCard, { EventCardSkeleton } from "@/components/cards/event-card";
import Navbar from "@/components/navigation/navbar";
import { getAllEvents } from "@/lib/api/event";
import { sortByStartTimeAndFilterPast } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

async function fetchAllEvents() {
  try {
    const response = await getAllEvents();
    if (!response.ok) {
      <div>Something have went wrong!</div>;
    }
    const sortedEvents = sortByStartTimeAndFilterPast(response);

    return (
      <Suspense
        fallback={[1, 2, 3, 4, 5, 6].map((el) => (
          <EventCardSkeleton key={el} />
        ))}
      >
        {sortedEvents.length > 0 &&
          sortedEvents.map(
            (event: any) =>
              !event.cancelled && (
                <Link href={`/event/${event.id}`} key={event.id}>
                  <EventCard event={event} />
                </Link>
              )
          )}
      </Suspense>
    );
  } catch (error) {
    console.error("Error fetching events:", error);
    <div>Something have went wrong!</div>;
  }
}

export default async function ExplorePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100dvh-56px)] px-4 py-6 bg-gray-50">
        <div className="max-w-7xl space-y-6 mx-auto">
          <div className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl bg-accent px-6 py-8 rounded-lg bg-gradient-to-r from-violet-200 to-pink-200">
            <div className="max-w-4xl text-white">
              Discover events happening in your community and around the world.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 md:gap-y-6">
            {await fetchAllEvents()}
          </div>
        </div>
      </main>
    </>
  );
}
