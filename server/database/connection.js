import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const databaseURI = process.env.MONGO_URI; // MongoDB URI from .env file
console.log(databaseURI)
const connectDB = async () => {
  try {
    const con = await mongoose.connect(databaseURI);
    console.log(`MongoDB is connected: ${con.connection.host}`);
  } catch (error) {
    console.log(`MongoDB connection failed with: ${error.message}`);
  }
};

export default connectDB;
