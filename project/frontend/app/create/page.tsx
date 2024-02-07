import CreateEventForm from "@/components/forms/create-event-form";

export default function CreatePage() {
  return (
    <main className="max-w-5xl mx-auto space-y-6 p-4">
      <h1 className="text-2xl font-medium tracking-tight">Create Event</h1>
      <CreateEventForm />
    </main>
  );
}
