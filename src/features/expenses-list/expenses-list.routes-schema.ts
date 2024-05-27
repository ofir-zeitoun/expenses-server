import { z } from "zod";

export const baseExpensesListSchemaNoId = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be no longer than 50 characters"),
  creator: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Creator must be a valid ObjectID"),
  expenses_ids: z.array(
    z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Each expenses ID must be a valid ObjectID")
  ),
  users_ids: z.array(
    z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Each user ID must be a valid ObjectID")
  ),
});

export const expensesListIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID must be a valid ObjectID"),
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

export interface Pagination extends qs.ParsedQs {
  offset: string;
  limit: string;
  sortOrder: "asc" | "desc";
}
