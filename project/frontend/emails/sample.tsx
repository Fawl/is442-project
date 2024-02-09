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

import * as React from "react";

export default function SampleEmail(props: any) {
  const { url } = props;
  return (
    <Tailwind>
      <Html>
        <div className="w-[400px] h-[600px] bg-[#fdf4f7] p-2 round-sm font-sans">
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
          <Section className="bg-white rounded-lg my-2 p-2">
            <div className=" font-xl">Hi,[name] Here is your ticket</div>
            <div className="my-2" >
              <Img
              className="mx-auto"
                alt="barcode"
                src="https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fl1nq.com%2FognyL&chs=180x180&choe=UTF-8&chld=L|2"
              />
            </div>
          </Section>
        </div>
      </Html>
    </Tailwind>
  );
}
