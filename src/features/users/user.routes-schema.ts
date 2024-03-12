import { z } from "zod";

export const usersSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be no longer than 50 characters"),
    lastName: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be no longer than 50 characters"),
    phone: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Password must be no longer than 24 characters"),
    photo: z.string(),
  }),
});
