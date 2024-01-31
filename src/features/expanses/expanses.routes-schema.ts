import { z } from 'zod';

export const baseExpnenseSchemaNoId = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name must be no longer than 50 characters"),
    amount: z.number().positive("Amount must be greater than zero"),
    cause: z.string().optional(),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Date must be a valid date string",
    }),
  }),
}).strict();