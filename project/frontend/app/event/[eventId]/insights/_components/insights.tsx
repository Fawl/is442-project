"use client";
import { Button } from "@/components/ui/button";
import { LineChartHero } from "./graph";
import InsightSummaryCard from "./insight-summary-card";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { SaveIcon } from "lucide-react";

function exportToPDF() {
  const section = document.getElementById("insights");

  // Use html2canvas to capture the content of the section as an image
  //   @ts-ignore
  html2canvas(section).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");

    // Calculate width and height of A4 size
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const imgWidth = 190; // Width of image on PDF (we're leaving some space for margins)
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create a new PDF document
    const doc = new jsPDF("p", "mm", "a4");

    // Add the captured image to the PDF
    doc.addImage(
      imgData,
      "PNG",
      (pdfWidth - imgWidth) / 2,
      10,
      imgWidth,
      imgHeight
    );

    // Save the PDF
    doc.save("insights.pdf");
  });
}
export default function Insights({
  ticketsPurchased,
  totalRevenue,
  ticketRedeemed,
  ticketRefunded,
  chartdata,
}: {
  ticketsPurchased: any;
  totalRevenue: any;
  ticketRedeemed: any;
  ticketRefunded: any;
  chartdata: any;
}) {
  return (
    <section id="insights">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Insights</div>
        <Button
          size="sm"
          variant="secondary"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary"
          onClick={exportToPDF}
        >
          <SaveIcon size={16} />
          <span>Export Insights</span>
        </Button>
      </div>

      <div className="flex w-full gap-3 mt-4">
        <InsightSummaryCard
          title="Total Ticket Purchased"
          value={ticketsPurchased}
        />
        <InsightSummaryCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2).toString()}`}
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

      <div className="mt-8">
        <div className="border rounded-lg p-4">
          <div className="text-sm font-medium text-muted-foreground pt-1">
            Transaction History Over the Past 12 Months
          </div>
          <LineChartHero data={chartdata} />
        </div>
      </div>
    </section>
  );
}
