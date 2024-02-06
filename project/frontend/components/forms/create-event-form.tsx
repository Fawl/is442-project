"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateEventSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

// COMPONENTS
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import React from "react";
import { format } from "date-fns";

export default function CreateEventForm() {
  // TRACK CALENDAR OPEN/CLOSE STATE
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);

  const form = useForm<z.infer<typeof CreateEventSchema>>({
    resolver: zodResolver(CreateEventSchema),
    defaultValues: {
      eventName: "",
      venue: "",
      totalTickets: 0,
    },
  });

  const handleOnSubmit = async (values: z.infer<typeof CreateEventSchema>) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleOnSubmit)}>
        <FormField
          control={form.control}
          name="eventName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800">Event name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter event name"
                  className={cn(
                    "w-full pl-3 text-left font-normal focus-visible:ring-1 focus-visible:ring-offset-0",
                    !field.value && "text-muted-foreground",
                    form.formState.errors.eventName?.message &&
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
            name="date"
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
                          form.formState.errors.date?.message &&
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

          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-gray-800">Time</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="time"
                    className={`${
                      form.formState.errors.startTime?.message &&
                      "border-red-500 focus-visible:ring-red-500"
                    } focus-visible:ring-1 focus-visible:ring-offset-0`}
                  />
                </FormControl>
                <FormMessage className="text-xs font-normal" />
              </FormItem>
            )}
          />
        </div>

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

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="ticketPrice"
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
                      form.formState.errors.ticketPrice?.message &&
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
            name="totalTickets"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800">
                  Number of tickets available
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className={cn(
                      "w-full pl-3 text-left font-normal focus-visible:ring-1 focus-visible:ring-offset-0",
                      !field.value && "text-muted-foreground",
                      form.formState.errors.totalTickets?.message &&
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
