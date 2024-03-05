import CustomDescription from "@/components/custom-description";
import PurchaseTicketModal from "@/components/modal/purchase-ticket-modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getEventById } from "@/lib/api/event";
import { addHours, format } from "date-fns";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";

export default async function SpecificEventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const eventId = params.eventId;
  const event = await getEventById(eventId);

  const utcStart = new Date(event.start);
  const utcEnd = new Date(event.end);

  // Add 8 hours to convert UTC to Singapore Time (SGT)
  const singaporeTimeOffset = 8;
  const singaporeStart = addHours(utcStart, singaporeTimeOffset);
  const singaporeEnd = addHours(utcEnd, singaporeTimeOffset);

  // Format the date and time in Singapore Time
  const formattedDate: string = format(singaporeStart, "EEEE, MMMM d");
  const formattedStartTime: string = format(singaporeStart, "h:mm a");
  const formattedEndTime: string = format(singaporeEnd, "h:mm a");

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <>
      <div className="relative bg-muted aspect-[16:9] h-[240px] rounded-lg">
        <Image
          src={event.imageLink}
          alt={event.title}
          layout="fill"
          className="rounded-lg object-cover"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        <section className="w-full md:w-2/3 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold line-clamp-1">
              {event.title}
            </h2>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground/80">
                About Event
              </div>
              <CustomDescription
                minRow={4}
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. In arcu cursus
        euismod quis. Eu mi bibendum neque egestas congue quisque. In dictum non
        consectetur a. Fermentum leo vel orci porta. Aenean sed adipiscing diam
        donec adipiscing tristique risus nec. At imperdiet dui accumsan sit amet
        nulla facilisi morbi tempus. Odio aenean sed adipiscing diam donec
        adipiscing tristique risus. In dictum non consectetur a erat nam. Eget
        egestas purus viverra accumsan in nisl nisi scelerisque eu. Id cursus
        metus aliquam eleifend mi in nulla posuere sollicitudin. Cras tincidunt
        lobortis feugiat vivamus. Facilisis volutpat est velit egestas dui id
        ornare arcu odio. Suspendisse sed nisi lacus sed viverra tellus in hac.
        Augue neque gravida in fermentum et sollicitudin ac orci phasellus.
        Pellentesque massa placerat duis ultricies lacus sed turpis tincidunt.
        Iaculis at erat pellentesque adipiscing. Blandit libero volutpat sed
        cras ornare arcu dui vivamus arcu."
              />
            </div>
          </div>
        </section>

        <section className="w-full h-fit md:w-1/3 space-y-6 border rounded-lg p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-gray-800 font-medium">Pricing</div>
              {event.cancelled && (
                <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                  Cancelled
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-row items-center gap-1.5 line-clamp-1">
                <span className="text-[#f05537] text-2xl font-semibold">
                  ${event.price.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground/80 font-normal tracking-wide">
                  /ticket
                </span>
              </div>
              <PurchaseTicketModal
                action={
                  <Button className="font-normal" disabled={event.cancelled}>
                    Book Now
                  </Button>
                }
              />
            </div>
          </div>
          <Separator className="my-6" />
          <div className="space-y-4">
            <div className="text-gray-800 font-medium">When & Where</div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center border w-[50px] rounded-md">
                <span className="text-xs text-center text-muted-foreground font-medium uppercase bg-muted px-2.5 py-1 rounded-t-md w-full">
                  Jun
                </span>
                <span className="py-1">15</span>
              </div>
              <div className="space-y-0.5 tracking-tight">
                <div className="text-sm text-gray-800 font-medium">
                  {formattedDate}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formattedStartTime} to {formattedEndTime}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center border w-[50px] h-[50px] rounded-md">
                <MapPinIcon size={24} className="text-muted-foreground" />
              </div>
              <div className="flex flex-col text-sm text-muted-foreground tracking-tight">
                <span className="text-sm text-gray-800 font-medium">
                  {event.venue}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
