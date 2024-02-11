import mongoose, { Schema } from "mongoose";
import { Timestamp } from "../../db";

const expansesSchema = new Schema(
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

export type Expense = {
  name: string;
  cause: string;
  amount: number;
  date: Date;
}
export interface ExpanseDocument extends mongoose.Document, Timestamp, Expense {

}

export const ExpansesModel = mongoose.model<ExpanseDocument>(
  "expanses",
  expansesSchema
);
