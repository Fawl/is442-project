import SampleEmail from "@/emails/sample";
import { render } from "@react-email/components";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


interface Ticket {
  id: number;
  event: number;
  boughtBy: number;
  redeemed: boolean;
  refunded: boolean;
  purchaseTime: string;
  price: number;
}

interface RequestBody {
  user: any;
  event:any
  subject: string;
  ticket: Ticket[];
}

export async function POST(request: { json: () => Promise<RequestBody> }) {
  
  try {
    const { user,event, subject, ticket } = await request.json();
    if (!user || !subject) {
      return NextResponse.json(
        { message: "Recipient email and subject are required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_FROM as string,
        pass: process.env.GMAIL_APP_PASSWORD as string,
      },
    });

    const emailHtml = render(
      SampleEmail({ user:user,event:event, ticket: ticket })
    );

    const mailOptions = {
      from: "ticketeer101@gmail.com",
      to: user.email,
      subject: subject,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Failed to send" }, { status: 500 });
  }
}
