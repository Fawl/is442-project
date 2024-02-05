import Navbar from "@/components/navigation/navbar";
import { buttonVariants } from "@/components/ui/button";
import { DEFAULT_ROUTES } from "@/lib/routes";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100dvh-56px)] max-w-[1440px] mx-auto flex items-center justify-center p-4">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h1 className="text-5xl font-semibold tracking-tight">
              Delightful events start here.
            </h1>
            <p className="text-lg lg:max-w-lg text-muted-foreground">
              Set up an event page, invite friends and sell tickets. Host a
              memorable event today.
            </p>
            <Link
              className={`${buttonVariants({
                size: "sm",
                variant: "secondary",
              })} font-normal px-2.5 text-sm`}
              href={DEFAULT_ROUTES.CREATE_EVENT}
            >
              Create Your First Event
            </Link>
          </div>

          <div className="text-center">Right</div>
        </div>
      </main>
    </>
  );
}
