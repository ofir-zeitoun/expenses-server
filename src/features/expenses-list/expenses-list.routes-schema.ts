import { z } from "zod";

export const baseExpensesListSchemaNoId = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be no longer than 50 characters"),
    expenses_ids: z
      .array(
        z.string().regex(/^[0-9a-fA-F]{24}$/, "ID must be a valid ObjectID")
      )
      .optional(),
    users_ids: z
      .array(
        z.string().regex(/^[0-9a-fA-F]{24}$/, "ID must be a valid ObjectID")
      )
      .optional(),
  }),
  user: z.object({
    sub: z
      .string()
      .min(2, "Sub must be at least 2 characters long")
      .max(50, "Sub must be no longer than 50 characters"),
  }),
});

export const expensesListIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID must be a valid ObjectID"),
});

export const queryParamsValidator = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID must be a valid ObjectID"),
  }),
});

export const updateExpensesListSchema =
  baseExpensesListSchemaNoId.merge(expensesListIdSchema);

export const paginationSchema = z.object({
  query: z.object({
    offset: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});
