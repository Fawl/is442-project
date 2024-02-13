import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const RegisterFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const CreateEventSchema = z.object({
  eventName: z.string().min(1, {
    message: "Required",
  }),
  venue: z.string().min(1, {
    message: "Required",
  }),
  date: z.date(),
  startTime: z.string(),
  ticketPrice: z.coerce.number(),
  totalTickets: z.coerce.number().gte(1, "Must be 1 or more"),
});
