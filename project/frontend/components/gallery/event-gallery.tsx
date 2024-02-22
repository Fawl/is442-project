"use client";
import { TicketedEvent } from "@/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import EventCard from "../cards/event-card";

export default function EventGallery() {

  const [events, setEvents] = useState<Array<TicketedEvent>>([])
  const [loading, setLoading]  = useState(true)
  const [status, setStatus]  = useState('Loading...')

  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_BACKEND + '/event/all', {method : 'GET'}).then(async res => {
      setEvents(await res.json() as Array<TicketedEvent>)
      setLoading(false)
    }).catch(err => {
      setStatus('Backend or Database not up')
    })
  },[])

  return (
    !loading ?
    events.map(event => 
      (<Link href={`/event/${event.id}`} key={event.id}>
        <EventCard event={event}/>
      </Link>)
    )
    : status
  )
}

