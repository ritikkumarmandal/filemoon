import mongoose from "mongoose";
import config from "./env.config.js";


const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;