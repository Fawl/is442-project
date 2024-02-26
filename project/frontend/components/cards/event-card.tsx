import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { TicketedEvent } from "@/types";
import { Skeleton } from "../ui/skeleton";
import { Clock3Icon, MapPinned, PinIcon } from "lucide-react";
interface EventCardProps {
  event: TicketedEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const formattedDate: string = format(event.start, "MMMM d");
  const formattedStartTime: string = format(event.start, "h:mm a");
  const formattedEndTime: string = format(event.end, "h:mm a");

  return (
    <div className="hover:cursor-pointer space-y-3 bg-white border shadow-sm rounded-lg p-2">
      <div className="bg-muted aspect-[16:9] h-[200px] rounded-lg">
        <img
          className="object-cover max-h-full min-w-full border border-gray-100 rounded-md"
          src={
            event.imageLink ??
            "https://images.unsplash.com/photo-1574805950011-8cdf615261b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY5NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4OTIwMTB8&ixlib=rb-4.0.3&q=80&w=1080"
          }
          alt={event.title}
        />
      </div>
      <div className="space-y-1 pt-0 p-2">
        <h2 className="font-semibold line-clamp-1">{event.title}</h2>
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground tracking-tight">
            <MapPinned size={14} />
            <span>Singapore</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground tracking-tight">
            <Clock3Icon size={14} />
            <span>{`${formattedDate}, ${formattedStartTime}`}</span>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center gap-1.5 line-clamp-1">
            <span className="text-[#f05537] font-semibold">$30.00</span>
            <span className="text-sm text-muted-foreground/80 font-normal tracking-wide">
              /ticket
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EventCardSkeleton() {
  return (
    <Skeleton className="border-2 border-primary-/20 h-[300px] w-full animate-pulse" />
  );
}
