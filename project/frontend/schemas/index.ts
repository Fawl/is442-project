import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const RegisterFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const CreateEventSchema = z.object({
  title: z.string().min(1, {
    message: "Required",
  }), // REQUIRED
  venue: z.string().min(1, {
    message: "Required",
  }), // REQUIRED
  description: z.string(), // OPTIONAL
  price: z.coerce.number(), // REQUIRED
  numTickets: z.coerce.number().gte(1, "Must be 1 or more"), // REQUIRED
  cancellationFee: z.coerce.number(), // OPTIONAL
  startDate: z.date(), // REQUIRED
  endDate: z.date(), // REQUIRED
  startTime: z.string(), // REQUIRED
  endTime: z.string(), // REQUIRED
  // imageLink: z.string(), // AUTO-GENERATED
  // createdBy: z.string(), // REQUIRED
});
