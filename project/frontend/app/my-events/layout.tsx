import { authConfig } from "@/auth";
import Navbar from "@/components/navigation/navbar";
import { DEFAULT_ROUTES } from "@/lib/routes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);
  if (session === null) {
    redirect(DEFAULT_ROUTES.LOGIN);
  }

  const userRole = session?.user?.role;

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100dvh-56px)] max-w-[1440px] mx-auto p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <>{children}</>
        </div>
      </main>
    </>
  );
}
