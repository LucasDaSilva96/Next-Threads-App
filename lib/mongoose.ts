import mongoose from 'mongoose';

let isConnected = false; // Database connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) {
    return console.log('MONGODB_URI not found');
  }

  if (isConnected) {
    return console.log('Already connected to database');
  }

  try {
    await mongoose.connect(process.env.DB_URL!);

    isConnected = true;

    console.log('Connected to database ✅');
  } catch (error) {
    console.log(error);
    throw new Error('Error connecting to database ❌');
  }
};
