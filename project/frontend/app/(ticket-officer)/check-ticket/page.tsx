"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { checkValidity, redeemValidity } from "@/lib/api/ticket";
import { toast } from "sonner";
import { useState } from "react";

export default function CheckTicket() {
  const [ticketId, setTicketId] = useState<string>("");
  const handleVerify = async () => {
    const id = ticketId;
    if (id != "") {
      try {
        const validate = await checkValidity(id);
        if (validate.message == "Validated.") {
          toast.error("Ticket is valid");
        } else {
          toast.error("Invalid Ticket");
        }
      } catch (error) {}
    } else {
      toast.error("Please enter a ticket number");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicketId(event.target.value);
  };

  const handleRedeem = async () => {
    try {
      const validate = await redeemValidity(ticketId);
      if (validate.message == "Redeemed.") {
        toast.success("Redeemed Ticket successfully");
      } else {
        toast.error("Invalid Ticket");
      }
    } catch (error) {}
  };

  return (
    <div className="flex justify-center">
      <div className="space-y-1.5 w-1/2">
        <Label htmlFor="id">Verify Ticket ID</Label>
        <Input
          type="text"
          id="id"
          placeholder="Ticket ID"
          className="h-11 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={ticketId}
          onChange={handleInputChange}
        />
        <div className="flex">
          <Button className="w-full" variant="outline"onClick={handleVerify}>
            Verify
          </Button>
          <Button
            className="w-full ml-6"
            disabled={!ticketId}
            onClick={handleRedeem}
          >
            Redeem
          </Button>
        </div>
      </div>
    </div>
  );
}
