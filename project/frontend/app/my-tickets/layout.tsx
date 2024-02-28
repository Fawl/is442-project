import Navbar from "@/components/navigation/navbar";

export default function myTicketLayout({children,}:{children: React.ReactNode}) {
  return (
    <>
      <Navbar/>
      <main className="min-h-[calc(100dvh-56px)] max-w-[1440px] mx-auto p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {children}
      </div></main>
    </>
  );
}
