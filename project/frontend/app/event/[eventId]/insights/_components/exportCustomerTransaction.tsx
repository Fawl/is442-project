"use client";
import { Button } from "@/components/ui/button";
import { getEventReportById } from "@/lib/api/event";
import { SaveIcon } from "lucide-react";

export function ExportCustomerTransaction({ eventId }: { eventId: string }) {
  const handleExport = async () => {
    try {
      const response = await getEventReportById(eventId);

      // Create a URL for the Blob
      const url = URL.createObjectURL(response);

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = url;

      // Set the download attribute to specify the filename
      link.download = "report_ev_" + eventId + ".xlsx"; // Set the filename to whatever you want

      // Append the link to the document body and click it programmatically
      document.body.appendChild(link);
      link.click();

      // Clean up: remove the temporary link and revoke the URL
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
    }
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
