import { getEventCustomerById } from "@/lib/api/event";
import CustomerTable from "./_components/customerTable";
import Insights from "./_components/insights";

export default async function SpecificEventInsightsPage({
  params,
}: {
  params: { eventId: string };
}) {
  const eventId = params.eventId;
  const ticketsPurchased = await getEventCustomerById(eventId);

  let totalRevenue = 0;
  let ticketRedeemed = 0;
  let ticketRefunded = 0;
  for (const ticket of ticketsPurchased) {
    totalRevenue += ticket.price;
    if (ticket.redeemed == true) {
      ticketRedeemed++;
    }
    if (ticket.refunded == true) {
      ticketRefunded++;
    }
  }

  // Initialize an object to store aggregated data
  const aggregatedData = {};

  // Loop through ticketsPurchased to aggregate data
  ticketsPurchased.forEach((ticket: any) => {
    const purchaseDate = new Date(ticket.purchaseTime);
    const monthYear = purchaseDate.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

    // If the month doesn't exist in aggregatedData, initialize it
    // @ts-ignore
    if (!aggregatedData[monthYear]) {
      // @ts-ignore
      aggregatedData[monthYear] = {
        "Ticket Purchased": 0,
        Revenue: 0,
      };
    }

    // Increment ticket count and revenue for the corresponding month
    // @ts-ignore
    aggregatedData[monthYear]["Ticket Purchased"]++;
    // @ts-ignore
    aggregatedData[monthYear].Revenue += ticket.price;
  });

  // Get current date
  const currentDate = new Date();

  // Generate end date (current month)
  const endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ); // Last day of the current month

  // Generate start date (12 months ago from end date)
  const startDate = new Date(endDate);
  startDate.setMonth(startDate.getMonth() - 11); // Subtract 11 to get 12 months

  // Generate months from start date to end date
  const monthsInRange = [];
  for (let d = startDate; d <= endDate; d.setMonth(d.getMonth() + 1)) {
    monthsInRange.push(
      d.toLocaleString("en-US", { month: "short", year: "numeric" })
    );
  }

  // Merge aggregatedData with all months in range
  const chartdata: any[] = monthsInRange.map((monthYear) => ({
    date: monthYear,
    // @ts-ignore
    "Ticket Purchased": aggregatedData[monthYear]
      ? // @ts-ignore
        aggregatedData[monthYear]["Ticket Purchased"]
      : 0,
    // @ts-ignore
    Revenue: aggregatedData[monthYear] ? aggregatedData[monthYear].Revenue : 0,
  }));

  return (
    <div className="w-full">
      <Insights
        ticketsPurchased={ticketsPurchased.length}
        totalRevenue={totalRevenue}
        ticketRedeemed={ticketRedeemed}
        ticketRefunded={ticketRefunded}
        chartdata={chartdata}
      />

      <div className="mt-8">
        <CustomerTable eventId={eventId} />
      </div>
    </div>
  );
}
