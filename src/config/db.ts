import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database is connected on ${connect.connection.host}`);
  } catch (error) {
    console.log(`Database is failed to connect : ${error}`);
    process.exit(1);
  }
};
