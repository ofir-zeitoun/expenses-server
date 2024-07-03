import mongoose, { Schema, Document } from "mongoose";
import { Timestamp } from "../../db";

export interface User extends Document, Timestamp {
  name: string;
  phone: string;
  photo: string;
  password: string;
  auth0Id: string;
}

const userSchema = new Schema<User>(
  {
    auth0Id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: false },
    photo: { type: String, required: false },
    password: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = mongoose.model<User>("User", userSchema);
