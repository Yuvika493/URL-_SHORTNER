// src/config/monogo.config.js
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

console.log("MongoDB URI:", process.env.MONGO_URI);

const connectDB = async () => {
  try {
    // In Mongoose 6+, no need for useNewUrlParser or useUnifiedTopology
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
