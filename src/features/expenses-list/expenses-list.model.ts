import mongoose, { Schema, Document } from "mongoose";
import { Timestamp } from "../../db";

const expensesListSchema = new Schema({
  name: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User'},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  expenses_ids: [{ type: Schema.Types.ObjectId, ref: 'Expense' }],
  users_ids: [{ type: Schema.Types.ObjectId, ref: 'User' }] // No change needed here for optionality
}, { versionKey: false, timestamps: true });

export type ExpensesList = {
  name: string;
  creator?: mongoose.Types.ObjectId;
  expenses_ids: mongoose.Types.ObjectId[];
  users_ids?: mongoose.Types.ObjectId[]; 
}

export interface ExpensesListDocument extends Document, Timestamp, ExpensesList {}

export const ExpensesListModel = mongoose.model<ExpensesListDocument>('ExpensesList', expensesListSchema);
