"use client";
import { Button } from "@/components/ui/button";
import csvDownload from "json-to-csv-export";
import { SaveIcon } from "lucide-react";

let formattedData: any[] = [];

export function ExportCustomerTransaction(data: any) {
  const rawData = data.data;

  // Extract data from rawData and format it for CSV export
  for (const item of rawData) {
    const { name: customerName, email: customerEmail } = item.customer;
    for (const ticket of item.ticketsPurchased) {
      const {
        redeemed: redeemedStatus,
        purchaseTime: purchaseDate,
        id: ticketId,
        price: ticketPrice,
      } = ticket;

      formattedData.push({
        "Customer Name": customerName,
        "Customer Email": customerEmail,
        "Ticket Id": ticketId,
        "Redeemed Status": redeemedStatus,
        "Purchase Date": new Date(purchaseDate),
        "Ticket Price": ticketPrice,
      });
    }
  }

  // Configuration for CSV export
  const dataToConvert = {
    data: formattedData,
    filename: "ip_addresses_report",
    delimiter: ",",
    headers: [
      "Customer Name",
      "Customer Email",
      "Ticket Id",
      "Redeemed Status",
      "Purchase Date",
      "Ticket Price",
    ],
  };

  // Function to handle export button click
  const handleExport = () => {
    csvDownload(dataToConvert);
    formattedData = []; // Clear formattedData after export
  };

  return (
    <Button
      size="sm"
      variant="secondary"
      className="flex items-center gap-2 text-muted-foreground hover:text-primary"
      onClick={handleExport}
    >
      <SaveIcon size={16} />
      <span>Export to CSV</span>
    </Button>
  );
}
