"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cancelEventById } from "@/lib/api/event";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function CancelEventModal({
  eventId,
  eventName,
  className,
  children,
}: {
  eventId: string;
  eventName: string;
  className: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handleCancelEvent = async () => {
    const response = await cancelEventById({ id: eventId });
    if (response !== null) {
      toast.success("Event has been cancelled and tickets refunded.");
      router.refresh();
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger onClick={() => setOpen(true)} className={className}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action{" "}
            <span className="font-medium text-primary uppercase">cannot</span>{" "}
            be undone. This will permanently cancel{" "}
            <span className="font-medium text-primary uppercase">
              {eventName}
            </span>{" "}
            and procced with refunding all the tickets.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <div className="flex justify-between items-center w-full">
            <AlertDialogCancel variant="secondary" className="font-normal">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelEvent}
              variant="destructive"
              className="font-normal"
            >
              Confirm
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
