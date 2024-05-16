import mongoose, { Schema, Document } from "mongoose";
import { Timestamp } from "../../db";

export interface Expense extends Document, Timestamp {
  name: string;
  cause: string;
  price: number;
  date: Date;
  creator: mongoose.Types.ObjectId;
}

const expenseSchema = new Schema<Expense>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    cause: { type: String, required: false },
    date: { type: Date, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { versionKey: false, timestamps: true }
);

export const ExpensesModel = mongoose.model<Expense>("Expenses", expenseSchema);
