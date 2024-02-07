import SampleEmail from "@/emails/sample";
import { render } from "@react-email/components";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface RequestBody {
  recipientEmail: string;
  subject: string;
}

export async function POST(request: { json: () => Promise<RequestBody> }) {
  try {
    const { recipientEmail, subject } = await request.json();

    if (!recipientEmail || !subject) {
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

    const emailHtml = render(SampleEmail({ url: "https://example.com" }));

    const mailOptions = {
      from: "ticketeer101@gmail.com",
      to: recipientEmail,
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
