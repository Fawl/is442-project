import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { TicketedEvent } from "@/types";
interface EventCardProps {
  event : TicketedEvent
}

const EventCard : React.FC<EventCardProps> = ({event}) => {

  const formattedDate : string = event.start ? format(event.start, "eee, MMMM d, h:mm a") : "TBC";
  {/* Sat, June 15, 10:00 AM */}

  return (
    <div className="hover:cursor-pointer space-y-3">
      <div className="relative">
        <div className="bg-muted aspect-[16:9] h-[200px] rounded-lg">
          <img className="object-cover max-h-full min-w-full" src={event.imageLink ?? "https://images.unsplash.com/photo-1574805950011-8cdf615261b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY5NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4OTIwMTB8&ixlib=rb-4.0.3&q=80&w=1080"} alt="" />
        </div>
        <Badge className="absolute top-2.5 left-2.5 font-normal bg-indigo-100 text-indigo-800 rounded-md">
          Music
        </Badge>
      </div>
      <div className="space-y-1">
        <div className="text-sm text-[#0977aa] tracking-tight font-medium">
          {formattedDate}
        </div>
        <h2 className="font-medium line-clamp-1">{event.title ?? "No Event Name"}</h2>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.desc ?? `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.`}
        </p>
      </div>
    </div>
  );
}

export default EventCard