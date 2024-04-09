import CreateEventForm from "@/app/(event-manager)/create/_components/create-event-form";
import { getEventById } from "@/lib/api/event";

export default async function EditEventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const eventId = params.eventId;
  console.log(eventId);
  const eventData = await getEventById(eventId);

  return (
    <main className="max-w-3xl space-y-6 p-4">
      <h1 className="text-2xl font-medium tracking-tight">Edit Event</h1>
      <CreateEventForm intialValues={eventData} type="edit" />
    </main>
  );
}
