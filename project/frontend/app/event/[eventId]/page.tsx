import { authConfig } from "@/auth";
import CustomDescription from "@/components/custom-description";
import BookTicketButton from "@/components/modal/book-ticket-modal";
import PurchaseTicketModal from "@/components/modal/purchase-ticket-modal";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getEventById } from "@/lib/api/event";
import { cn, isMoreThan6MonthsOrLessThan1Day } from "@/lib/utils";
import { addHours, format } from "date-fns";
import { MapPinIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function SpecificEventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const session = await getServerSession(authConfig);
  const userRole = session?.user?.role;

  const eventId = params.eventId;
  const event = await getEventById(eventId);
  const utcStart = new Date(event.start);
  const utcEnd = new Date(event.end);
  // Add 8 hours to convert UTC to Singapore Time (SGT)
  const singaporeTimeOffset = 8;
  const singaporeStart = addHours(utcStart, singaporeTimeOffset);
  const singaporeEnd = addHours(utcEnd, singaporeTimeOffset);

  // Format the date and time in Singapore Time
  const formattedDate: string = format(singaporeStart, "EEEE, MMMM d yyyy");
  const formattedDateOnly: string = format(singaporeStart, "d");
  const formattedMonthOnly: string = format(singaporeStart, "MMM");
  const formattedStartTime: string = format(singaporeStart, "h:mm a");
  const formattedEndTime: string = format(singaporeEnd, "h:mm a");

  if (!event) {
    return <div>Event not found</div>;
  }
  console.log(event);
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
              <CustomDescription minRow={4} text={event.description} />
            </div>
          </div>
        </section>

        <section className="w-full h-fit md:w-1/3 space-y-6 border rounded-lg p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-gray-800 font-medium">Pricing</div>
              {event.cancelled && (
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Cancelled
                </span>
              )}
              {isMoreThan6MonthsOrLessThan1Day(event.start) &&
                event.cancelled === false && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Unavailable
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
              {userRole == "ticket_officer" && (
                <BookTicketButton eventId={eventId} />
              )}

              {session !== null ? (
                <>
                  {userRole == "customer" && (
                    <PurchaseTicketModal
                      event={event}
                      userId={session?.user?.id!}
                      action={
                        <Button
                          className="font-normal"
                          // Disable the button if the event is cancelled or
                          // if the event is more than 6 months away or
                          // less than 1 day away from the current date or if the user is not a customer
                          disabled={
                            event.cancelled ||
                            isMoreThan6MonthsOrLessThan1Day(utcStart)
                          }
                        >
                          Book Now
                        </Button>
                      }
                    />
                  )}
                </>
              ) : (
                <Link
                  href={
                    event.cancelled || isMoreThan6MonthsOrLessThan1Day(utcStart)
                      ? "#"
                      : `/login?callbackUrl=/event/${eventId}`
                  }
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    `font-normal ${
                      (event.cancelled ||
                        isMoreThan6MonthsOrLessThan1Day(utcStart)) &&
                      "cursor-not-allowed opacity-50"
                    }`
                  )}
                >
                  Book Now
                </Link>
              )}
            </div>
            {userRole == "event_manager" && (
              <div className="text-sm p-2 bg-accent/60 text-muted-foreground">
                As an event manager, you will not be able to book tickets using
                this account. Please use a customer account to book tickets.
              </div>
            )}
          </div>
          <Separator className="my-6" />
          <div className="space-y-4">
            <div className="text-gray-800 font-medium">When & Where</div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center border w-[50px] rounded-md">
                <span className="text-xs text-center text-muted-foreground font-medium uppercase bg-muted px-2.5 py-1 rounded-t-md w-full">
                  {formattedMonthOnly}
                </span>
                <span className="py-1">{formattedDateOnly}</span>
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
