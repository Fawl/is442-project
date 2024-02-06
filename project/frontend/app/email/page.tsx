"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import handler from "@/components/emails/sendApi";

const SendEmail = () => {
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    handler();
  };

  return (
    <form onSubmit={handleSubmit}>
      HI
      <Button type="submit">Send</Button>
    </form>
  );
};

export default SendEmail;
