import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEventCustomerById } from "@/lib/api/event";
import { getUserById } from "@/lib/api/user";
import { ExportCustomerTransaction } from "./exportCustomerTransaction";

async function processTickets(customers: any[]) {
  const groupedData: {
    [key: number]: { customer: any; ticketsPurchased: any[] };
  } = {};
  customers.forEach((ticket: any) => {
    const customerId = ticket.boughtBy;
    if (!groupedData[customerId]) {
      groupedData[customerId] = {
        customer: { id: customerId },
        ticketsPurchased: [],
      };
    }
    groupedData[customerId].ticketsPurchased.push(ticket);
  });

  const result = Object.values(groupedData);

  for (const item of result) {
    const customerId = item.customer.id;
    const customerData = await getUserById(customerId);
    item.customer = customerData;
  }

  return result;
}

export default async function CustomerTable({ eventId }: { eventId: string }) {
  const customers = await getEventCustomerById(eventId);
  const result = await processTickets(customers);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Transactions</div>
        <ExportCustomerTransaction data={result} />
      </div>

      <div className="border rounded-lg mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Puchased Qty</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{CustomerTableRow(result)}</TableBody>
        </Table>
      </div>
    </>
  );
}

function CustomerTableRow(data: any) {
  return (
    <>
      {data.map((item: any) => {
        const customer = item.customer;
        const tickets = item.ticketsPurchased;
        const totalAmount = tickets.reduce((acc: number, ticket: any) => {
          return acc + ticket.price;
        }, 0);

        return (
          <TableRow key={customer.id}>
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{tickets.length}</TableCell>
            <TableCell>${totalAmount.toFixed(2)}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
}
