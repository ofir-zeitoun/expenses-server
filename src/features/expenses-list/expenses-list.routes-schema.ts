import { z } from 'zod';

export const baseExpensesListSchemaNoId = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name must be no longer than 50 characters"),
    creator: z.string().regex(/^[0-9a-fA-F]{24}$/, "Creator must be a valid ObjectID").optional(),
    expensesIds: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Each expenses ID must be a valid ObjectID")),
    usersIds: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Each user ID must be a valid ObjectID")).optional(),
    
  }),
});

export const expensesListIdSchema = z.object({
  params: z.object({
    _id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID must be a valid ObjectID"),
  }),
});

export const updateExpensesListSchema = baseExpensesListSchemaNoId.merge(expensesListIdSchema);
