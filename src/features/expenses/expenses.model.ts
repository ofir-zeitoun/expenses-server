import mongoose, { Schema } from "mongoose";
import { Timestamp } from "../../db";

export type Expense = {
  name: string;
  cause: string;
  amount: number;
  date: Date;
} & Timestamp;

const expensesSchema = new Schema<Expense>(
  {
    name: String,
    amount: Number,
    cause: String,
    date: Date,
    createdAt: Date,
    updatedAt: Date,
  },
  { versionKey: false, timestamps: true }
);

export const ExpensesModel = mongoose.model<Expense>(
  "expenses",
  expensesSchema
);
