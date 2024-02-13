import { InfiniteMovingCards } from "@/components/cards/infinite-moving-cards";
import Navbar from "@/components/navigation/navbar";
import { buttonVariants } from "@/components/ui/button";
import { DEFAULT_ROUTES } from "@/lib/routes";
import Link from "next/link";

export default function Home() {
  const items = [
    {
      imageSrc: "/coldplay.png",
      dateTime: "Wed, January 31, 8:00 PM",
      title: "Coldplay World Tour",
      description:
        "British rock band Coldplay returns to play at the National Stadium in Singapore for their Music Of The Spheres tour in 2024. Happening at the 55,000 pax-capacity National Stadium, the group made history as the first act ever to play sold-out six nights in the city-state.",
    },
    {
      imageSrc: "/genAI.png",
      dateTime: "Tue, February 06, 2:00 PM",
      title: "Generative AI Hackathon",
      description:
        "Join us for an exciting Generative AI Hackathon, where innovators and creators come together to explore the cutting-edge possibilities of artificial intelligence. Unleash your creativity, solve challenges, and be part of the future of AI. Don't miss this unique opportunity to dive into the world of generative AI!",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100dvh-56px)] max-w-[1440px] mx-auto flex items-center justify-center p-4">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-5xl font-semibold tracking-tight">
              Delightful events
              <br />
              start here.
            </h1>
            <p className="text-lg lg:max-w-md text-muted-foreground">
              Set up an event page, invite friends and sell tickets. Host a
              memorable event today.
            </p>
            <Link
              className={`${buttonVariants({
                size: "sm",
                variant: "secondary",
              })} font-normal px-2.5 text-sm w-fit`}
              href={DEFAULT_ROUTES.CREATE_EVENT}
            >
              Create Your First Event
            </Link>
          </div>

          <div className="text-center">
            <InfiniteMovingCards items={items} />
          </div>
        </div>
      </main>
    </>
  );
}
