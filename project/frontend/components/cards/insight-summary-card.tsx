import { Card } from "../ui/card";

export default function InsightSummaryCard({
  title,
  value,
  percentageChange,
}: {
  title: string;
  value: string;
  percentageChange?: string;
}) {
  return (
    <Card className="space-y-2 p-4">
      <h2 className="text-sm font-medium">{title}</h2>
      <div>
        <h1 className="text-xl font-semibold">{value}</h1>
        <div className="text-sm text-muted-foreground">{percentageChange}</div>
      </div>
    </Card>
  );
}
