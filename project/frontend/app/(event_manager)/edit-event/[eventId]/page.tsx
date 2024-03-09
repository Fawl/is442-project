import CreateEventForm from "@/components/forms/create-event-form";
import { getEventById } from "@/lib/api/event";

export default async function EditEventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const eventId = params.eventId;
  console.log(eventId);
  const event = await getEventById(eventId);

  return (
    <main className="max-w-3xl space-y-6 p-4">
      <h1 className="text-2xl font-medium tracking-tight">Edit Event</h1>
      <CreateEventForm intialValues={event} type="edit" />
    </main>
  );
}
