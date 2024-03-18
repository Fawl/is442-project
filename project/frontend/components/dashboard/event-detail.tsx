import React, { useState } from 'react'
import EventDetailOnclick from './event-detail-onclick'

export default function EventDetail({event }: any) {

  const [showPopup, setShowPopup] = useState(false)
  
  const displayPopup = () => {
    setShowPopup(!showPopup)
  }
  console.log(event)

    return(
        <div 
        className="mt-3 mb-1 text-center sm:ml-0 sm:mt-0 sm:text-left border rounded border-orange-300 p-1 cursor-pointer"
        onClick={displayPopup}>

          <div className="max-w-sm rounded overflow-hidden shadow-lg mb-2">
            <img className="w-full" src={event.image_link} alt="Sunset in the mountains"/>
            
          </div>

          <div className="flex items-center">
            <span className="text-sm text-black font-medium">Event: </span>&nbsp;
            <span className="text-sm text-gray-700">{event.eventName}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-black font-medium">Total Revenue: </span>&nbsp;
            <span className="text-sm text-gray-700">${event.priceSum}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-black font-medium">Total Ticket Sold: </span>&nbsp;
            <span className="text-sm text-gray-700">{event.ticketsSold}</span>
          </div>

          {showPopup && <EventDetailOnclick event={event}/>}
      </div>
    )
}