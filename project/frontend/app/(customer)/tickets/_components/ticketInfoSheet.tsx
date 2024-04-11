"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cancelTicketByTicketId } from "@/lib/api/ticket";
import { differenceInHours, format } from "date-fns";
import { useQRCode } from "next-qrcode";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TicketInfoSheet({
  children,
  eventData,
}: {
  children: React.ReactNode;
  eventData: any;
}) {
  const router = useRouter();
  const { Canvas } = useQRCode();
  const startDate = new Date(eventData.eventDetails.startTime);
  const currentTime = new Date();
  const startTime = new Date(startDate);
  const hoursDifference = differenceInHours(startTime, currentTime);
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
            return (
              <Card className="relative p-4" key={index}>
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    Purchased on:{" "}
                    {format(new Date(ticket.purchaseTime), "dd MMM yyyy")}
                  </span>

                  <div>
                    {ticket.refunded === true && (
                      <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                        Refunded
                      </span>
                    )}

                    {ticket.refunded === false && (
                      <>
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
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full">
                  <Canvas
                    text={ticket.id.toString()}
                    options={{
                      errorCorrectionLevel: "M",
                      margin: 3,
                      scale: 4,
                      width: 200,
                    }}
                  />
                  <span className="text-sm text-muted-foreground">
                    #{ticket.id}
                  </span>
                </div>

                {ticket.refunded === false && hoursDifference > 48 && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="w-full mt-3"
                    onClick={async () => {
                      try {
                        const response = await cancelTicketByTicketId(
                          ticket.id
                        );
                        if (response) {
                          router.refresh();
                          setOpen(false);
                        }
                      } catch (error) {
                        console.error("Error canceling ticket:", error);
                        // Handle the error if necessary
                        // For example, you could display an error message to the user
                      }
                    }}
                  >
                    Cancel
                  </Button>
                )}

                {ticket.refunded === false && (
                  <div
                    className="p-4 text-sm text-muted-foreground rounded-lg bg-gray-50 mt-4"
                    role="alert"
                  >
                    Event can only be cancelled 48 hours before the start time.
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
