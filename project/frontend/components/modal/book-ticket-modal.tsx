"use client";
import { Button } from "../ui/button";
import React, { use } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { MinusCircle, PlusCircleIcon } from "lucide-react";
import { createUser, createUserByEmail, getUserByEmail } from "@/lib/api/user";
import {
  issueTicketByTicketOfficer,
  purchaseTicketByEventIdANDUserId,
} from "@/lib/api/ticket";
import { z } from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function BookTicketDialog({
  eventId,
  open,
  setIsOpen,
}: {
  eventId: string;
  open: any;
  setIsOpen: (open: boolean) => void;
}) {
  const CreateUserSchema = z.object({
    email: z.string().email({
      message: "Required",
    }),
    
    })

  const router = useRouter();

  const [ticketQuantity, setTicketQuantity] = React.useState(1);
  const [emailError, setEmailError] = React.useState(false);
  const [error, setError] = React.useState("");
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
      setError(`You can only issue up to ${maxTickets} tickets.`);
    }
  };
  // const issueTicketNew = async (email) => {};

  const handleIssueTicket = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    
    let userAccount = null;
    try {
      const validatedData = CreateUserSchema.parse({
        email: email,
        
      });
      
      const issue = await issueTicketByTicketOfficer({
        eventId,
        email,
        ticketQuantity,
      });

      if (issue) {
        console.log(issue)
        toast.success("Successfully issued Ticket");
        const sendTicket = await fetch(
          process.env.NEXT_PUBLIC_FRONTEND + `/api/sendTicket`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(issue),
          }
        );
      }
    } catch (error:any) {
      if (error.errors?.find((error:any) => error.path[0] === "email")) {
        setEmailError(true);
        
      } 
     
    }
    }
  

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Issue Ticket to Customer</DialogTitle>
          <DialogDescription>
            Fill in the customer details and the ticket will be sent to the
            customer
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-3" onSubmit={handleIssueTicket}>
          <div className="grid w-full items-center gap-1.5">
            Number of Tickets
            <div className="space-y-2 flex items-center flex-col">
              <div className="flex gap-2 w-full">
                <Button
                type="button"
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
                type="button"
                  variant="secondary"
                  onClick={() => handleQuantityChange(1)}
                >
                  <PlusCircleIcon size={16} />
                </Button>
              </div>
              <div className="text-sm text-red-500">{error}</div>
            </div>
            
            <div>
              <Label htmlFor="email">Customer Email</Label>
              <Input
                type="text"
                id="email"
                placeholder="Customer Email"
                className={cn(
                  "h-11 focus-visible:ring-0 focus-visible:ring-offset-0",
                  emailError && "border-red-300 bg-red-50"
                )}
              />
            </div>
            
          </div>
          <Button type="submit">Issue Ticket</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function BookTicketButton({ eventId }: { eventId: string }) {
  const [open, setIsOpen] = React.useState(false);
  return (
    <>
      <BookTicketDialog eventId={eventId} open={open} setIsOpen={setIsOpen} />
      <Button onClick={() => setIsOpen(true)}>Issue Ticket</Button>
    </>
  );
}
