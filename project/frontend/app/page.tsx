import { EventCardSkeleton } from "@/components/cards/event-card";
import EventGallery from "@/components/gallery/event-gallery";
import Navbar from "@/components/navigation/navbar";
import { getAllEvents } from "@/lib/api/event";
import { Suspense } from "react";

async function fetchAllEvents() {
  try {
    const response = await getAllEvents();
    console.log(response);
    if (!response.ok) {
      <div>Something have went wrong!</div>;
    }

    return (
      <Suspense
        fallback={[1, 2, 3, 4, 5, 6].map((el) => (
          <EventCardSkeleton key={el} />
        ))}
      >
        <EventGallery events={response} />
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
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 md:gap-y-6">
            {await fetchAllEvents()}
          </div>
        </div>
      </main>
    </>
  );
}
