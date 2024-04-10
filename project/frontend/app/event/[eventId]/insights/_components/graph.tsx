"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { LineChart } from "@tremor/react";

const dataFormatter = (number: number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

const customTooltip = (props: any) => {
  const { payload, active } = props;
  if (!active || !payload) return null;

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-md border">
      <div className="text-sm font-medium px-4 py-2">
        {payload[0].payload.date}
      </div>
      <Separator />
      <div className="px-4 py-2 space-y-2">
        {payload.map((item: any, idx: number) => (
          <div key={idx} className="flex items-center space-x-2">
            <span
              className={cn(
                `w-3 h-3 aspect-square rounded-full`,
                item.name === "Ticket Purchased"
                  ? "bg-[#6366f1]"
                  : "bg-[#f43f5e]"
              )}
            />
            <div className="text-sm text-gray-600 flex gap-4 items-center justify-between w-full">
              <span>{item.name}</span>
              <span className="text-primary font-medium">
                {item.name === "Ticket Purchased"
                  ? item.value
                  : `$${item.value}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export function LineChartHero({ data }: { data: any }) {
  return (
    <LineChart
      className="h-80"
      data={data}
      index="date"
      categories={["Ticket Purchased", "Revenue"]}
      colors={["indigo", "rose"]}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
      customTooltip={customTooltip}
    />
  );
}
