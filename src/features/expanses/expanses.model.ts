import mongoose, { Schema } from "mongoose";
import { Timestamp } from "../../db";

const expansesSchema = new Schema(
  {
    _id: Schema.ObjectId,

    name: String,
    amount: Number,
    cause: String,
    createdAt: Date,
    updatedAt: Date,
  },
  { versionKey: false, timestamps: true }
);

export interface ExpanseDocument extends mongoose.Document, Timestamp {
  name: string;
  cause: string;
  amount: number;
}

export const ExpansesModel = mongoose.model<ExpanseDocument>(
  "expanses",
  expansesSchema
);
