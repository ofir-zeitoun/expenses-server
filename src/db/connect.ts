import mongoose from "mongoose";

export const connect = async () => {
  try {
    const uri = process.env.DBUri || "mongodb://127.0.0.1:27017";
    const res = await mongoose.connect(uri);
    console.log("🚀 ~ file: connect.ts:9 ~ connect ~ mongoose: connected");
    return res;
  } catch (error : any) {
    if (error?.reason?.type === 'ReplicaSetNoPrimary') {
      console.error("🚀 ~ Your IP isn't in whitelist talk to your administrator:");
    } else {
      console.error("🚀 ~ file: connect.ts:11 ~ connect ~ error:", error);
    }

   
    
    process.exit(1);
  }
};
