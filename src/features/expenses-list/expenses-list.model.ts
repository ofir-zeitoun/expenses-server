import mongoose, { Schema, Document } from "mongoose";
import { Timestamp } from "../../db";

const expensesListSchema = new Schema({
  name: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'users'},
  createdAt: Date,
  updatedAt: Date,
  expenses_ids: [{ type: Schema.Types.ObjectId, ref: 'expenses' }],
  users_ids: [{ type: Schema.Types.ObjectId, ref: 'users' }] 
}, { versionKey: false, timestamps: true });

export type ExpensesList = {
  name: string;
  creator?: mongoose.Types.ObjectId;
  expenses_ids: mongoose.Types.ObjectId[];
  users_ids?: mongoose.Types.ObjectId[]; 
}

export interface ExpensesListDocument extends Document, Timestamp, ExpensesList {}

export const ExpensesListModel = mongoose.model<ExpensesListDocument>('expenses-lists', expensesListSchema);
