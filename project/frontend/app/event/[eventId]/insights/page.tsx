import { getEventCustomerById } from "@/lib/api/event";
import InsightSummaryCard from "./_components/insight-summary-card";

export default async function SpecificEventInsightsPage({
  params,
}: {
  params: { eventId: string };
}) {
  const eventId = params.eventId;
  const ticketsPurchased = await getEventCustomerById(eventId);

  let ticketRedeemed = 0;
  let ticketRefunded = 0;
  for (const ticket of ticketsPurchased) {
    if (ticket.redeemed == true) {
      ticketRedeemed++;
    }
    if (ticket.refunded == true) {
      ticketRefunded++;
    }
  }

  return (
    <div className="w-full">
      <div className="flex w-full gap-2">
        <InsightSummaryCard
          title="Total Ticket Purchased"
          value={ticketsPurchased.length}
        />
        <InsightSummaryCard
          title="Total Ticket Redeemed"
          value={ticketRedeemed.toString()}
        />
        <InsightSummaryCard
          title="Total Ticket Refunded"
          value={ticketRefunded.toString()}
        />
      </div>
    </div>
  );
}
