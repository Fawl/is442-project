import Navbar from "@/components/navigation/navbar";
import EventGallery from "@/components/gallery/event-gallery";

export default async function ExplorePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100dvh-56px)] max-w-[1440px] mx-auto p-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
          <EventGallery/>
        </div>
      </main>
    </>
  );
}
