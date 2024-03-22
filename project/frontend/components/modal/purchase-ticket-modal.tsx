"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MinusCircle, PlusCircleIcon } from "lucide-react";
import { purchaseTicketByEventIdANDUserId } from "@/lib/api/ticket";
import { toast } from "sonner";


export default function PurchaseTicketModal({
  eventId,
  userId,
  action,
}: {
  eventId: string;
  userId: string;
  action: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [error, setError] = useState("");
  const maxTickets = 5;

  const handleQuantityChange = (amount: number) => {
    const newQuantity = ticketQuantity + amount;

    if (newQuantity >= 1 && newQuantity <= maxTickets) {
      setTicketQuantity(newQuantity);
      setError(""); // Clear the error message if the quantity is within the allowed range
    } else if (newQuantity < 1) {
      // Optional: Handle the case where the quantity is less than 1
      setTicketQuantity(1);
      setError("");
    } else {
      // Display a message when trying to purchase more than the maximum allowed tickets
      setError(`You can only purchase up to ${maxTickets} tickets.`);
    }
  };

  const handleCheckout = async () => {
    const payload = { eventId, userId, ticketQuantity };
    try {
      const response = await purchaseTicketByEventIdANDUserId(payload);
      if (response != null) {
        toast.success("Ticket purchased successfully");
        setOpen(false);
      }
    } catch (error) {
      toast.error("Failed to purchase ticket")
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{action}</DialogTrigger>

      <DialogContent>
        <div className="max-w-sm mx-auto space-y-6">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2 flex items-center flex-col">
              <div className="flex gap-2 w-full">
                <Button
                  variant="secondary"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={ticketQuantity === 1}
                >
                  <MinusCircle size={16} />
                </Button>
                <Input
                  className="w-full text-center text-xl p-0"
                  value={ticketQuantity}
                />
                <Button
                  variant="secondary"
                  onClick={() => handleQuantityChange(1)}
                >
                  <PlusCircleIcon size={16} />
                </Button>
              </div>
              <div className="text-sm text-red-500">{error}</div>
            </div>
            <Button className="w-full" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
