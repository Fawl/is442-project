// "use client";
// import SummaryMetrics from "@/components/dashboard/summary-metric";
// import LineChart from "@/components/dashboard/line-chart";
// import { useState, useEffect} from "react";

// export default function DashboardPage() {
//   const [tickets, setTickets] = useState(
//     [
//     {
//         "id": 1,
//         "event": 1,
//         "boughtBy": 2,
//         "redeemed": false,
//         "refunded": false,
//         "purchaseTime": "2024-03-05T06:29:44.680093",
//         "price": 69.69
//     },
//     {
//         "id": 2,
//         "event": 1,
//         "boughtBy": 2,
//         "redeemed": false,
//         "refunded": false,
//         "purchaseTime": "2024-03-05T06:33:50.097057",
//         "price": 69.69
//     },
//     {
//       "id": 3,
//       "event": 2,
//       "boughtBy": 2,
//       "redeemed": false,
//       "refunded": false,
//       "purchaseTime": "2024-04-05T06:29:44.680093",
//       "price": 69.69
//   }
//   ])

//   const [events, setEvents] = useState(
//     [
//       {
//         "Rock Concert": 
//         {
//           "id": 1,
//           "venue": "Madison Square Garden",
//           "desc": null,
//           "price": 100,
//           "cancellation_fee": 0,
//           "num_tickets": 1000,
//           "cancelled": "false",
//           "start_time": "2024-06-01 19:00:00",
//           "end_time": "2024-06-01 22:00:00",
//           "image_link": "https://images.unsplash.com/photo-1619229666372-3c26c399a4cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY5NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4OTIwMTB8&ixlib=rb-4.0.3&q=80&w=1080",
//           "created_by": 4
//         }
//       },
//       {
//         "Classical Music Performance": 
//         {
//           "id": 4,
//           "venue": "Symphony Hall",
//           "desc": null,
//           "price": 300,
//           "cancellation_fee": 0,
//           "num_tickets": 300,
//           "cancelled": "false",
//           "start_time": "2024-09-10 20:00:00",
//           "end_time": "2024-09-10 22:30:00",
//           "image_link": "https://images.unsplash.com/photo-1465661910194-fd1393a57d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY5NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc5MDQxMTB8&ixlib=rb-4.0.3&q=80&w=1080",
//           "created_by": 4
//         }
//       }
//     ]
//   )

//   const [summaryMetrics, setSummaryMetrics] = useState({
//     totalRevenue: 0,
//     ticketsSold: 0,
//     averageTicketPrice: 0
//   })

//   const [revenueByMonth, setRevenueByMonth] = useState<{ month: String, revenue: number }[]>([{
//     month: "Jan",
//     revenue: 0,
//   }])

//   useEffect(() => {
//     async function fetchData() {
//       await calculateSummaryMetrics();
//       await calculateMonthlyRevenue();
//     }
    
//     fetchData();
//   })

//   const fetchEvents = async () => {
//     return events
//   }

//   const calculateSummaryMetrics = async () => {
//     const events = await fetchEvents()

//     const totalRevenue = events.reduce((res, event) => {
//       const revenue = Object.values(event)[0].num_tickets * Object.values(event)[0].price
//       return res + revenue
//     }, 0)

//     const ticketsSold = events.reduce((res, event) => {
//       const ticket = Object.values(event)[0].price
//       return res + ticket
//     }, 0)

//     const averageTicketPrice = Math.round(totalRevenue / ticketsSold * 100) / 100

//     setSummaryMetrics({
//       totalRevenue: totalRevenue,
//       ticketsSold: ticketsSold,
//       averageTicketPrice: averageTicketPrice
//     })
//   }

//   const calculateMonthlyRevenue = async () => {
//     const events = await fetchEvents()
//     const revenueByIdx = Array(12).fill(0);
//     const monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Augt", "Sep", "Oct", "Nov", "Dec"];
    

//     events.forEach(event => {
//       const price = Object.values(event)[0].price
//       const numTickets = Object.values(event)[0].num_tickets
//       const month = new Date(Object.values(event)[0].start_time).getMonth() + 1

//       revenueByIdx[month] = (revenueByIdx[month] || 0) + (price * numTickets)
//     })

//     const revenueByMth= revenueByIdx.map((e, idx) => {
//       const monthName = monthNames[idx]
//       return {month: monthName, revenue: e}
//     })
 
//     setRevenueByMonth(revenueByMth)  
//   }


//   return(<div className="grid grid-cols-3 gap-4">
  
//     <div className="grid grid-cols-subgrid gap-4 col-span-3">
//       <h1 className="col-start-1">Event Sales Dashboard</h1>
//     </div>

//     <div className="grid grid-cols-subgrid gap-4 col-span-3">
//       <SummaryMetrics metricName={"Total Revenue"} metricValue={summaryMetrics.totalRevenue} />
//       <SummaryMetrics metricName={"Total Tickets Sold"} metricValue={summaryMetrics.ticketsSold} />
//       <SummaryMetrics metricName={"Average Ticket Price"} metricValue={summaryMetrics.averageTicketPrice} />
//     </div>


//     <div className="grid grid-cols-subgrid gap-4 col-span-3">
//       <div className="col-start-1 col-span-2">
//         <LineChart data={revenueByMonth}/>
//       </div>

//       <p className="col-start-3">Event Details</p>
//     </div>
    
//   </div>
//   );
  
// }
