"use client";
import { CreateEventSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// COMPONENTS
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format, set } from "date-fns";
import { createEvent } from "@/lib/api/event";
import { useRouter } from "next/navigation";

export default function CreateEventForm() {
  const router = useRouter();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const form = useForm<z.infer<typeof CreateEventSchema>>({
    resolver: zodResolver(CreateEventSchema),
    defaultValues: {
      title: "",
      venue: "",
      description: "",
      price: 0,
      numTickets: 0,
      cancellationFee: 0,
    },
  });

  const handleOnSubmit = async (values: z.infer<typeof CreateEventSchema>) => {
    // Combine start date and time
    const startDate = new Date(values.startDate);
    const [startHours, startMinutes] = values.startTime.split(":").map(Number);
    const combinedStartDateTime = set(startDate, {
      hours: startHours,
      minutes: startMinutes,
    });

    // Combine end date and time
    const endDate = new Date(values.endDate);
    const [endHours, endMinutes] = values.endTime.split(":").map(Number);
    const combinedEndDateTime = set(endDate, {
      hours: endHours,
      minutes: endMinutes,
    });

    // FORMAT DATA
    const payload = {
      title: values.title,
      venue: values.venue,
      start: combinedStartDateTime.toISOString(),
      end: combinedEndDateTime.toISOString(),
      price: values.price,
      numTickets: values.numTickets,
      cancellationFee: values.cancellationFee,
      user_id: "2", // TODO: Replace with actual user ID
    };

    // alert(JSON.stringify(payload, null, 2));
    try {
      const response = await createEvent(payload);
      if (response) {
        router.push(`/`);
        router.refresh();
      }
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleOnSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800">Event name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Event name"
                  className={cn(
                    "w-full pl-3 text-left font-normal focus-visible:ring-1 focus-visible:ring-offset-0",
                    !field.value && "text-muted-foreground",
                    form.formState.errors.title?.message &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
              </FormControl>
              <FormMessage className="font-normal" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="venue"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800">Venue</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Venue"
                  className={cn(
                    "w-full pl-3 text-left font-normal focus-visible:ring-1 focus-visible:ring-offset-0",
                    !field.value && "text-muted-foreground",
                    form.formState.errors.venue?.message &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
              </FormControl>
              <FormMessage className="font-normal" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800">Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Description"
                  className={cn(
                    "w-full pl-3 text-left font-normal focus-visible:ring-1 focus-visible:ring-offset-0",
                    !field.value && "text-muted-foreground",
                    form.formState.errors.description?.message &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
              </FormControl>
              <FormMessage className="font-normal" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800">Ticket price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className={cn(
                      "w-full pl-3 text-left font-normal focus-visible:ring-1 focus-visible:ring-offset-0",
                      !field.value && "text-muted-foreground",
                      form.formState.errors.price?.message &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                </FormControl>
                <FormMessage className="font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numTickets"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800">
                  Tickets available
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className={cn(
                      "w-full pl-3 text-left font-normal focus-visible:ring-1 focus-visible:ring-offset-0",
                      !field.value && "text-muted-foreground",
                      form.formState.errors.numTickets?.message &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                </FormControl>
                <FormMessage className="font-normal" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="cancellationFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800">
                  Cancellation fee
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className={cn(
                      "w-full pl-3 text-left font-normal focus-visible:ring-1 focus-visible:ring-offset-0",
                      !field.value && "text-muted-foreground",
                      form.formState.errors.cancellationFee?.message &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                </FormControl>
                <FormMessage className="font-normal" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-gray-800">Date</FormLabel>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal focus-visible:ring-1 focus-visible:ring-offset-0",
                        !field.value && "text-muted-foreground",
                        form.formState.errors.startDate?.message &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(e) => {
                      field.onChange(e);
                      form.setValue("endDate", form.getValues("startDate")); // Set end date to start date
                      setIsCalendarOpen(false);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs font-normal" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800">Start time</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="time"
                    className={cn(
                      "w-full pl-3 text-left font-normal focus-visible:ring-1 focus-visible:ring-offset-0",
                      !field.value && "text-muted-foreground",
                      form.formState.errors.startTime?.message &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                </FormControl>
                <FormMessage className="font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800">End time</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="time"
                    className={cn(
                      "w-full pl-3 text-left font-normal focus-visible:ring-1 focus-visible:ring-offset-0",
                      !field.value && "text-muted-foreground",
                      form.formState.errors.endTime?.message &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                </FormControl>
                <FormMessage className="font-normal" />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Create Event
        </Button>
      </form>
    </Form>
  );
}
