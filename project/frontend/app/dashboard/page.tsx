import InsightSummaryCard from "@/components/cards/insight-summary-card";
import AdminEventTable from "@/components/table/adminEventTable";

export default function DashboardPage() {
  return (
    <div>
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <InsightSummaryCard title="Total Event" value="1234" />
          <InsightSummaryCard title="Total Revenue" value="$45,231.89" />
          <InsightSummaryCard title="title" value="value" />
        </div>

        <AdminEventTable />
      </div>
    </div>
  );
}
