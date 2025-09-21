import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // loads variables from .env (make sure .env is at root level)

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is successfully connected!");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1); // stop app if DB connection fails
  }
};

export default connectDB;
