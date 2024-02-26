import Navbar from "@/components/navigation/navbar";
import EventGallery from "@/components/gallery/event-gallery";
import { getAllEvent } from "@/actions/event.action";
import { Suspense } from "react";
import { EventCardSkeleton } from "@/components/cards/event-card";

export default async function ExplorePage() {
  const eventData = await getAllEvent();
  console.log(eventData);
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100dvh-56px)] px-4 py-6 bg-gray-50">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 md:gap-y-6">
            <Suspense
              fallback={[1, 2, 3, 4, 5, 6].map((el) => (
                <EventCardSkeleton key={el} />
              ))}
            >
              <EventGallery events={eventData} />
            </Suspense>
          </div>
        </div>
      </main>
    </>
  );
}
