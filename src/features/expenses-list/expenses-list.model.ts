import mongoose, { Schema, Document, Types } from "mongoose";
import { Timestamp } from "../../db";
import { Expense } from "../expenses/expenses.model"; // Import the missing 'Expenses' type

export interface ExpensesList extends Document, Timestamp {
  name: string;
  creator: Types.ObjectId;
  expenses: Expense[];
  users_ids: Types.ObjectId[];
}

const expensesListSchema = new Schema<ExpensesList>(
  {
    name: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    expenses: [{ type: Schema.Types.ObjectId, ref: "Expenses" }],
    users_ids: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { versionKey: false, timestamps: true }
);

export const ExpensesListModel = mongoose.model<ExpensesList>(
  "ExpensesLists",
  expensesListSchema
);
