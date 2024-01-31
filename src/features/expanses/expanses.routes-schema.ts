import { z } from 'zod';

// const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(20\d\d) ([01]\d|2[0-3]):([0-5]\d)$/;

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