"use client";
import { LineChart } from "@tremor/react";

const dataFormatter = (number: number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

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
      onValueChange={(v) => console.log(v)}
    />
  );
}
