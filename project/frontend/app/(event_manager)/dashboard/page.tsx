import InsightSummaryCard from "@/components/cards/insight-summary-card";
import AdminEventTable from "@/components/table/adminEventTable";
import { getAllEvents } from "@/lib/api/event";

export default async function DashboardPage2() {
  try {
    const response = await getAllEvents();
    if (!response.ok) {
      <div>Something have went wrong!</div>;
    }

    const totalNoOfEvents = response.length;

    return (
      <div>
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <InsightSummaryCard title="Total Event" value={totalNoOfEvents} />
            <InsightSummaryCard title="Total Revenue" value="$45,231.89" />
            <InsightSummaryCard title="title" value="value" />
          </div>

          <AdminEventTable eventsData={response} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching events:", error);
    <div>Something have went wrong!</div>;
  }
}
