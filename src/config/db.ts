import mongoose from "mongoose";

export const connectDb = async () => {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    console.error(
      "❌ Error: MONGO_URL environment variable is missing. Database connection aborted."
    );
    process.exit(1);
  }

  try {
    const connect = await mongoose.connect(mongoUrl);
    console.log(`✅ Database is connected on ${connect.connection.host}`);
  } catch (error) {
    console.log(`❌ Database failed to connect: ${error}`);
    process.exit(1);
  }
};
