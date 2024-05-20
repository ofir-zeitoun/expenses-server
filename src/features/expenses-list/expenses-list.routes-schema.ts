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

export const ExpenseSchema = z.object({
  _id: z.string(),
  createdAt: z
    .string()
    .default(() => new Date().toISOString())
    .refine((val) => !isNaN(new Date(val).valueOf()), {
      message: "Invalid date",
    }),
  updatedAt: z
    .string()
    .default(() => new Date().toISOString())
    .refine((val) => !isNaN(new Date(val).valueOf()), {
      message: "Invalid date",
    }),
  name: z.string(),
  price: z.number(),
  creator: z.object({
    _id: z.string(),
    name: z.string(),
    image: z.string(),
  }),
});

export const ExpensesListSchema = z.object({
  _id: z.string(),
  name: z.string(),
  createdAt: z
    .string()
    .default(() => new Date().toISOString())
    .refine((val) => !isNaN(new Date(val).valueOf()), {
      message: "Invalid date",
    }),
  updatedAt: z
    .string()
    .default(() => new Date().toISOString())
    .refine((val) => !isNaN(new Date(val).valueOf()), {
      message: "Invalid date",
    }),
  creator: z.object({
    _id: z.string(),
    name: z.string(),
    image: z.string(),
  }),
  expenses: z.array(ExpenseSchema),
});

export const querySchema = z.object({
  offset: z.string().optional(),
  limit: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type JSONExpense = z.infer<typeof ExpenseSchema>;
export type JSONExpensesList = z.infer<typeof ExpensesListSchema>;
