import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useQRCode } from "next-qrcode";

export default function TicketInfoSheet({
  children,
  eventData,
}: {
  children: React.ReactNode;
  eventData: any;
}) {
  const { Canvas } = useQRCode();

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{eventData.eventDetails.title}</SheetTitle>
          <SheetDescription className="flex flex-col">
            <span>About</span>
            <span className="text-primary mt-1">
              {eventData.eventDetails.description || "No description"}
            </span>
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-3">
          {eventData.ticketPurchase.map((ticket: any, index: number) => {
            console.log(ticket);
            return (
              <Card className="relative p-4" key={index}>
                <div>
                  <Canvas
                    text={ticket.id.toString()}
                    options={{
                      errorCorrectionLevel: "M",
                      margin: 3,
                      scale: 4,
                      width: 200,
                    }}
                  />
                </div>
                <div className="absolute top-4 right-2">
                  {ticket.redeemed === false && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                      Available
                    </span>
                  )}
                  {ticket.redeemed === true && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                      Redeemed
                    </span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
