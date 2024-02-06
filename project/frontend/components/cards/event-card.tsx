import { Badge } from "../ui/badge";

export default function EventCard() {
  return (
    <div className="hover:cursor-pointer space-y-3">
      <div className="relative">
        <div className="bg-muted aspect-[16:9] h-[200px] rounded-lg"></div>
        <Badge className="absolute top-2.5 left-2.5 font-normal bg-indigo-100 text-indigo-800 rounded-md">
          Music
        </Badge>
      </div>
      <div className="space-y-1">
        <div className="text-sm text-[#0977aa] tracking-tight font-medium">
          Sat, June 15, 7:30 PM
        </div>
        <h2 className="font-medium line-clamp-1">Generative AI Hackathon</h2>
        <p className="text-sm text-muted-foreground line-clamp-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
}
