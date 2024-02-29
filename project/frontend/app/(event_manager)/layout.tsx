import Navbar from "@/components/navigation/navbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="sticky top-[56px] border-b flex items-center justify-between h-14 bg-accent px-4 z-50">
        <Link
          href="/dashboard"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "text-muted-foreground font-normal"
          )}
        >
          Back to Dashboard
        </Link>
      </div>
      <div className="min-h-[calc(100dvh-56px)] max-w-[1440px] mx-auto p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <>{children}</>
        </div>
      </div>
    </>
  );
}
