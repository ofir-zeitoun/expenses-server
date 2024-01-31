import mongoose, { Schema } from "mongoose";
import { Timestamp } from "../../db";

const expansesSchema = new Schema(
  {
    _id: Schema.ObjectId,
    name: String,
    amount: Number,
    cause: String,
    date: Date,
    createdAt: Date,
    updatedAt: Date,
  },
  { versionKey: false, timestamps: true }
);

// expansesSchema.pre('save', function(next) {
//   if (!this._id) {
//     this._id = new mongoose.Types.ObjectId();
//   }
//   next();
// });


export interface ExpanseDocument extends mongoose.Document, Timestamp {
  name: string;
  cause: string;
  amount: number;
  date: Date;
}

export const ExpansesModel = mongoose.model<ExpanseDocument>(
  "expanses",
  expansesSchema
);
