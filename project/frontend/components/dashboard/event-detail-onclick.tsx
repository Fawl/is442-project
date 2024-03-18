import React from 'react'

export default function EventDetailOnclick({event}: any) {
    return(
    <div>
      <div className="flex items-center">
        <span className="text-sm text-black font-medium">Tickets Refunded: </span>&nbsp;
        <span className="text-sm text-gray-700">{event.ticketsrefunded}</span>
      </div>

      <div className="flex items-center">
        <span className="text-sm text-black font-medium">Venue: </span>&nbsp;
        <span className="text-sm text-gray-700">{event.venue}</span>
      </div>

      <div className="flex items-center">
        <span className="text-sm text-black font-medium">Event Date: </span>&nbsp;
        <span className="text-sm text-gray-700">{event.start_time.substring(0,10)}</span>
      </div>

      <div className="flex items-center">
        <span className="text-sm text-black font-medium">Duration: </span>&nbsp;
        <span className="text-sm text-gray-700">{event.start_time.substring(10,19)}-{event.end_time.substring(11,19)}</span>
      </div>

      <div className="flex items-center">
        <span className="text-sm text-black font-medium">Ticket Purchased Time:</span>&nbsp;
      </div>

      {event.purchaseTime.map((date: any) => <div className="grid grid-flow-col text-sm text-gray-700 bg-orange-100 p-1 mb-1">{date}</div>)}
    </div>


    )
}