import { z } from "zod";

export const baseUserSchemaNoId = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "First name must be at least 2 characters long")
      .max(50, "First name must be no longer than 50 characters"),
    phone: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Password must be no longer than 50 characters"),
    photo: z.string().optional(),
  }),
});

export const userIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID must be a valid ObjectID"),
  }),
});

export const updateUserSchema = baseUserSchemaNoId.merge(userIdSchema);
