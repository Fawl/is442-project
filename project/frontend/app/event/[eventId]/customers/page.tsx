import { getEventCustomerById } from "@/lib/api/event";

export default async function SpecificEventCustomersPage({
  params,
}: {
  params: { eventId: string };
}) {
  const eventId = params.eventId;
  const customers = await getEventCustomerById(eventId);

  for (const customer of customers) {
    const customerId = customer.boughtBy;
  }

  return <div>Customers</div>;
}
