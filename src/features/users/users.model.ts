import mongoose, { Schema, Document } from "mongoose";
import { Timestamp } from "../../db";

export interface User extends Document, Timestamp {
  name: string;
  phone: string;
  photo: string;
  password: string;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: false },
    photo: { type: String, required: false },
    password: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = mongoose.model<User>("User", userSchema);
