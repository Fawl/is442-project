import { authConfig } from "@/auth";
import Navbar from "@/components/navigation/navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);
  if (!session) {
    return redirect("/login?callbackUrl=/create");
  }

  if (session.user?.role !== "event_manager") {
    return <div>No access</div>;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100dvh-56px)] max-w-[1440px] mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <>{children}</>
        </div>
      </div>
    </>
  );
}
