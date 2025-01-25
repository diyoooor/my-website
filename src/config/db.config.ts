// src/config/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger.util';

dotenv.config(); // Load .env

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables.');
    }
    await mongoose.connect(process.env.MONGO_URI, {
      // Mongoose connection options
    });
    logger.info('MongoDB connected successfully')
  } catch (error) {
    logger.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit process if DB connection fails
  }
};

export default connectDB;
