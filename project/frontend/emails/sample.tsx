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
import { Hr } from "@react-email/components";
import { MapIcon, MapPinIcon, TicketIcon } from "lucide-react";



export default function SampleEmail(props: any) {
  const { user,ticket,event } = props;
  console.log(props)
  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime)
  const dayOfMonth = startTime.getDate();
  const month = startTime.toLocaleString('default', { month: 'short' }).toUpperCase();
  const abbreviatedMonth = month.substring(0, 3);
  const dayOfMonthFormatted = startTime.toLocaleString('default', { weekday: 'long' });
  function getOrdinalSuffix(day:any) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}
function formatDate(dateString:any) {
  const date = new Date(dateString);
  const dayOfMonth = date.getDate();
  const ordinalSuffix = getOrdinalSuffix(dayOfMonth);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthName = monthNames[date.getMonth()];

  return `${dayOfMonth}${ordinalSuffix} ${monthName}`;
}
function formatTimeWithColon(dateString:any) {
  const time = new Date(dateString);
  let hours = time.getHours();
  const minutes = time.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  
  if (hours > 12) {
      hours -= 12;
  } else if (hours === 0) {
      hours = 12;
  }

  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}${period}`;
}
  return (
    <Tailwind>
      <Html>
        <div className="w-[400px] bg-[#fdf4f7] p-2 round-sm font-sans">
          <Img
            className="w-full rounded-lg"
            alt="banner"
            src={event.imageLink}
          />
          <Section className=" rounded-lg p-2 bg-white my-1 font-sans">
            <span className="font-semibold text-xl">{event.title}</span>
            <div className="my-2 flex flex-row">
              <div className="rounded-lg w-8 h-8 p-2 bg-[#fcfafa] text-center text-green-800">
                <div className="text-xs">{abbreviatedMonth}</div>
                <div>{dayOfMonth}</div>
              </div>
              <div className="my-auto mx-2">
                <div>{dayOfMonthFormatted} {formatDate(startTime)}</div>
                <div className="text-xs text-green-800">{formatTimeWithColon(startTime)} to {formatTimeWithColon(endTime)}</div>
              </div>
            </div>

            <div className="my-2 flex flex-row">
              <div className="rounded-lg w-8 h-8 p-2 bg-[#fcfafa] text-green-800 text-center flex justify-center">
                <div className="mx-auto my-auto">
                  <MapPinIcon />
                </div>
              </div>
              <div className="my-auto mx-2">
                <div>{event.venue}</div>
                <div className="text-xs text-green-800">Singapore</div>
              </div>
            </div>
          </Section>

          <Section className="bg-white rounded-lg my-2">
            <div className="font-semibold border-b pt-2 px-2 flex ">
              <TicketIcon className="text-green-800 w-[20px] h-[20px]" />
              <div className="my-auto ml-2">Ticket Information </div>
            </div>
            <Hr />
            <div className="p-2">
              <div className=" font-xl">
                Hi, Here is your ticket(s) information
              </div>

              {ticket.map((tix: any, index:any) => (
                <div key={index} className="bg-white shadow-md p-4 mb-4">
                  <div className="text-lg font-semibold text-center mb-2">
                    Ticket Details
                  </div>
                  <div className="flex flex-col items-center">
                    <div key={`ticket-id-${tix.id}`} className="text-gray-600">
                      Ticket ID: {tix.id}
                    </div>
                    <div
                      key={`event-id-${tix.event}`}
                      className="text-gray-600"
                    >
                      Event ID: {tix.event}
                    </div>
                    <div key={`price-${tix.id}`} className="text-gray-600">
                      Price: ${tix.price}
                    </div>
                    <div key={index}> 
                      <Img key={index} src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${tix.id}`} ></Img>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </Html>
    </Tailwind>
  );
}
