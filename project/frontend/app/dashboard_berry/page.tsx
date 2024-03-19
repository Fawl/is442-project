"use client";
import SummaryMetrics from "@/components/dashboard/summary-metric";
import LineChart from "@/components/dashboard/line-chart";
import { useState, useEffect } from "react";
import EventTable from "@/components/dashboard/event-table";
import DownloadButton from "@/components/dashboard/download-button";

export default function DashboardPage() {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      event: 1,
      boughtBy: 2,
      redeemed: false,
      refunded: false,
      purchaseTime: "2024-03-05T06:29:44.680093",
      price: 69.69,
    },
    {
      id: 2,
      event: 1,
      boughtBy: 2,
      redeemed: false,
      refunded: false,
      purchaseTime: "2024-03-05T06:33:50.097057",
      price: 69.69,
    },
    {
      id: 3,
      event: 2,
      boughtBy: 2,
      redeemed: false,
      refunded: false,
      purchaseTime: "2024-04-05T06:29:44.680093",
      price: 69.69,
    },
  ]);

  const [events, setEvents] = useState([
    {
      "Rock Concert": {
        id: 1,
        venue: "Madison Square Garden",
        desc: null,
        price: 100,
        cancellation_fee: 0,
        num_tickets: 1000,
        cancelled: "false",
        start_time: "2024-06-01 19:00:00",
        end_time: "2024-06-01 22:00:00",
        image_link:
          "https://images.unsplash.com/photo-1619229666372-3c26c399a4cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY5NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4OTIwMTB8&ixlib=rb-4.0.3&q=80&w=1080",
        created_by: 4,
      },
    },
    {
      "Classical Music Performance": {
        id: 2,
        venue: "Symphony Hall",
        desc: null,
        price: 300,
        cancellation_fee: 0,
        num_tickets: 300,
        cancelled: "false",
        start_time: "2024-09-10 20:00:00",
        end_time: "2024-09-10 22:30:00",
        image_link:
          "https://images.unsplash.com/photo-1465661910194-fd1393a57d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY5NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc5MDQxMTB8&ixlib=rb-4.0.3&q=80&w=1080",
        created_by: 4,
      },
    },
  ]);

  const [ticketEvents, setTicketEvents] = useState([] as any);

  const [summaryMetrics, setSummaryMetrics] = useState({
    totalRevenue: 0,
    ticketsSold: 0,
    averageTicketPrice: 0,
  });

  const [revenueByMonth, setRevenueByMonth] = useState<
    { month: String; revenue: number }[]
  >([
    {
      month: "Jan",
      revenue: 0,
    },
  ]);

  const [selectedDates, setSelectedDates] = useState({} as any);

  useEffect(() => {
    async function fetchData() {
      await updateMetrics();
    }

    fetchData();
  }, [tickets]);

  const fetchEvents = async () => {
    return events;
  };

  // calculateSummaryMetricsn and calculateMonthlyRevenue
  const updateMetrics = async () => {
    interface EventTickets {
      [eventId: number]: any[];
    }

    const filteredTickets: EventTickets = tickets
      .filter((ticket) => {
        const purchaseDate = new Date(ticket.purchaseTime);
        const purchaseMonth = purchaseDate.getMonth() + 1;
        return purchaseMonth >= 3 && purchaseMonth <= 4;
      })
      .reduce((acc, ticket) => {
        if (!acc[ticket.event]) {
          acc[ticket.event] = [];
        }
        acc[ticket.event].push(ticket);
        return acc;
      }, {} as EventTickets);

    const totalRevenue = Object.values(filteredTickets)
      .flat()
      .reduce((total, ticket) => total + ticket.price, 0);
    const ticketsSold = Object.values(filteredTickets).reduce(
      (total, tickets) => total + tickets.length,
      0
    );
    const averageTicketPrice =
      Math.round((totalRevenue / ticketsSold) * 100) / 100;

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthlyTotalRevenue = Array.from({ length: 12 }, (_, monthIndex) => ({
      month: monthNames[monthIndex],
      revenue: 0,
    }));

    Object.values(filteredTickets)
      .flat()
      .forEach((ticket) => {
        const purchaseDate = new Date(ticket.purchaseTime);
        const monthIndex = purchaseDate.getMonth();
        monthlyTotalRevenue[monthIndex].revenue += ticket.price;
      });

    setSummaryMetrics({
      totalRevenue: totalRevenue,
      ticketsSold: ticketsSold,
      averageTicketPrice: averageTicketPrice,
    });

    setRevenueByMonth(monthlyTotalRevenue);

    interface EventStatistics {
      [key: number]: {
        ticketsrefunded: number;
        priceSum: number;
        ticketsSold: number;
        purchaseTime: string[];
        selected: boolean;
        eventName?: string;
        venue?: string;
        start_time?: string;
        end_time?: string;
        image_link?: string;
      };
    }

    let eventStats: EventStatistics = {};

    tickets.forEach((ticket) => {
      const eventID = ticket.event;

      if (!eventStats[eventID]) {
        eventStats[eventID] = {
          ticketsrefunded: 0,
          priceSum: 0,
          ticketsSold: 0,
          purchaseTime: [],
          selected: false,
        };
      }

      if (ticket.refunded) {
        eventStats[eventID].ticketsrefunded++;
      } else {
        eventStats[eventID].priceSum += ticket.price;
        eventStats[eventID].ticketsSold++;
        eventStats[eventID].purchaseTime.push(ticket.purchaseTime);
      }
    });

    events.forEach((event) => {
      const eventName = Object.keys(event)[0] as keyof typeof event;
      const eventDetails = event[eventName];

      if (eventDetails) {
        const eventID = eventDetails.id;
        const venue = eventDetails.venue;
        const start_time = eventDetails.start_time;
        const end_time = eventDetails.end_time;
        const image_link = eventDetails.image_link;

        if (eventStats[eventID]) {
          eventStats[eventID].eventName = eventName;
          eventStats[eventID].venue = venue;
          eventStats[eventID].start_time = start_time;
          eventStats[eventID].end_time = end_time;
          eventStats[eventID].image_link = image_link;
        }
      }
    });

    eventStats = Object.values(eventStats);
    setTicketEvents(eventStats);
  };

  const selectEvent = (eventName: any) => {
    setTicketEvents((prevEvents: { eventName: any; selected: any }[]) =>
      prevEvents.map((event: { eventName: any; selected: any }) => {
        if (event.eventName == eventName) {
          return { ...event, selected: !event.selected };
        }
        return event;
      })
    );
  };

  // datepickeer component
  const setDate = (dates: any) => {
    if (dates.to && dates.from) {
      setSelectedDates(dates);
      console.log("yyyyy");
      console.log(typeof selectedDates.to);
      console.log(selectedDates);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="grid grid-cols-subgrid gap-4 col-span-3">
        <h1 className="col-start-1 col-span-2">Event Sales Dashboard</h1>
        <div className="col-start-3 col-span-1">
          <DownloadButton
            summaryMetrics={summaryMetrics}
            revenueByMonth={revenueByMonth}
            eventList={ticketEvents}
          />
        </div>
      </div>

      <div className="grid grid-cols-subgrid gap-4 col-span-3">
        <SummaryMetrics
          metricName={"Total Tickets Sold"}
          metricValue={summaryMetrics.ticketsSold}
        />
        <SummaryMetrics
          metricName={"Average Ticket Price"}
          metricValue={summaryMetrics.averageTicketPrice}
        />
        <SummaryMetrics
          metricName={"Average Ticket Price"}
          metricValue={summaryMetrics.totalRevenue}
        />
      </div>

      <div className="grid grid-cols-subgrid gap-4 col-span-3">
        <div className="col-start-1 col-span-2">
          <LineChart data={revenueByMonth} />
        </div>

        <div className="col-start-3 col-span-1">
          <EventTable ticketEvents={ticketEvents} onSelect={selectEvent} />
        </div>
      </div>
    </div>
  );
}
