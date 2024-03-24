import mongoose, { Schema } from "mongoose";
import { Timestamp } from "../../db";

export type User = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  photo: string;
  password: string;
} & Timestamp;

const userSchema = new Schema<User>(
  {
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    photo: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<User>("users", userSchema);
