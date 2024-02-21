import {
  Button,
  Html,
  Container,
  Tailwind,
  Section,
  Row,
  Column,
  Img,
} from "@react-email/components";
import QRCode from "react-qr-code";
import * as React from "react";
import { Hr } from "@react-email/components";

export default function SampleEmail(props: any) {
  
  const { url } = props;
  const value="cysdyahd"
  const name="Chi Yong"
  return (
    <Tailwind>
      <Html>
        <div className="w-[400px] bg-[#fdf4f7] p-2 round-sm font-sans">
          <Img
            className="w-full rounded-lg"
            alt="banner"
            src="https://ci3.googleusercontent.com/meips/ADKq_Nb50Ng7GaBS-9VFoJxaYY2nIBmpK5HgB6gdLI3BnfwZs6WpJQgj8sRSMCcugXae7d3sohknqYisEJMbopubLQ7l5bUdt0sOpSVj7mip0mVT1QgQiidKgAG-7miJyWMw1uQXKMMn7pvHXhZRYbsuImfIAn3fGx7ARgiNtxkjyn4VUDuT4w=s0-d-e1-ft#https://image.mailing.ticketmaster.com/lib/fe3411727664047e7c1772/m/1/96b64f22-b224-463e-ad1c-31f5dfeb6413.jpg"
          />
          <Section className=" rounded-lg p-2 bg-white my-1 font-sans">
            <span className="font-semibold text-xl">BLACKPINK WORLD TOUR</span>
            <div className="my-2 flex flex-row">
              <div className="rounded-lg w-8 h-8 p-2 bg-[#fcfafa] text-center text-green-800">
                <div className="text-xs">JUL</div>
                <div>21</div>
              </div>
              <div className="my-auto mx-2">
                <div>Friday 21st July</div>
                <div className="text-xs text-green-800">10 AM to 5PM</div>
              </div>
            </div>

            <div className="my-2 flex flex-row">
              <div className="rounded-lg w-8 h-8 p-2 bg-[#fcfafa] text-green-800 text-center flex justify-center">
                <div className="mx-auto my-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-map-pin"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
              </div>
              <div className="my-auto mx-2">
                <div>National Stadium</div>
                <div className="text-xs text-green-800">Singapore</div>
              </div>
            </div>
          </Section>
          <Section className="bg-white rounded-lg my-2">
            <div className="font-semibold border-b pt-2 px-2 flex ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-ticket text-green-800"
              >
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                <path d="M13 5v2" />
                <path d="M13 17v2" />
                <path d="M13 11v2" />
              </svg>
              <div className="my-auto ml-2">Ticket Information </div>
            </div>
            <Hr />
            <div className="p-2">
              <div className=" font-xl">Hi, {name} Here is your ticket</div>
              <div className="my-2 flex justify-center">
                <QRCode value={value} className="h-40 w-40 m-2" />
                
              </div>
              <div className="text-center font-semibold">{value}</div>
              
            </div>
          </Section>
        </div>
      </Html>
    </Tailwind>
  );
}
