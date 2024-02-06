import Navbar from "@/components/navigation/navbar";

export default function SpecificEventPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100dvh-56px)] max-w-[1440px] mx-auto p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-muted aspect-[16:9] h-[240px] rounded-lg"></div>
          <div>Specific Event Page</div>
        </div>
      </main>
    </>
  );
}
