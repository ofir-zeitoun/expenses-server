import mongoose, { Schema, Document } from "mongoose";
import { Timestamp } from "../../db";

const expensesListSchema = new Schema(
  {
    name: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date, default: Date.now, required: true },
    expenses: [{ type: Schema.Types.ObjectId, ref: "Expenses" }],
    users_ids: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { versionKey: false, timestamps: true }
);

export type ExpensesList = {
  name: string;
  creator?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  expenses: mongoose.Types.ObjectId[];
  users_ids?: mongoose.Types.ObjectId[];
};

export interface ExpensesListDocument extends Document, Timestamp {
  creator(creator: any): unknown;
  expenses: any;
}

export const ExpensesListModel = mongoose.model<ExpensesListDocument>(
  "ExpensesLists",
  expensesListSchema
);
