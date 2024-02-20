import mongoose, { Schema } from "mongoose";
import { Timestamp } from "src/db";

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    photo: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

export type User = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  photo: string;
  password: string;
};

export interface UserDocument extends mongoose.Document, Timestamp, User {}

export const UserModel = mongoose.model<UserDocument>("users", userSchema);
