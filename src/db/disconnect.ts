import mongoose from "mongoose";

export const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log(
      "🚀 ~ file: connect.ts ~ line X ~ disconnect ~ mongoose: disconnected"
    );
  } catch (error) {
    console.error(
      "🚀 ~ file: connect.ts ~ line Y ~ disconnect ~ error:",
      error
    );
  }
};
