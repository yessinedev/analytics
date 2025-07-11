import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL as string;

if(!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: any;
}

async function connectDB() {
  try {
    await mongoose.connect(DATABASE_URL)
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to the database');
    
  }
}

export default connectDB;