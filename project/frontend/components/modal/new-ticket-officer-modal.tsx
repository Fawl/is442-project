"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RegisterForm from "../forms/register-form";
import { useState } from "react";

export default function NewTicketOfficerModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New ticket officer</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new ticket officer.
          </DialogDescription>
        </DialogHeader>
        <RegisterForm
          userType="ticket_officer"
          isMangerSignUpCallback={handleCloseModal}
        />
      </DialogContent>
    </Dialog>
  );
}
