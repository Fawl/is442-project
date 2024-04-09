import { Card } from "../../../../../components/ui/card";

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
    <Card className="w-full space-y-2 p-4">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div>
        <h1 className="text-xl font-semibold">{value}</h1>
        <div className="text-sm text-muted-foreground">{percentageChange}</div>
      </div>
    </Card>
  );
}
