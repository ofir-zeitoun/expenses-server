import mongoose from "mongoose";

export const connect = async () => {
  try {
    const uri = process.env.DBUri || "mongodb://127.0.0.1:27017";
    const res = await mongoose.connect(uri);
    console.log("🚀 ~ file: connect.ts:9 ~ connect ~ mongoose: connected");
    return res;
  } catch (error) {
    console.error("🚀 ~ file: connect.ts:11 ~ connect ~ error:", error);
    process.exit(1);
  }
};
