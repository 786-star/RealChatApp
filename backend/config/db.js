import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectToDatabase = async () => {
  try {
      await mongoose.connect(process.env.DB_URL);
      console.log('Connected to database');
  } catch (error) {
      console.log(error);
  }
}

export default connectToDatabase