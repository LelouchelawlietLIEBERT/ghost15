import mongoose from 'mongoose';

const connectMongodb = async (): Promise<void> => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Connected To MongoDB');
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('An unknown error occurred while connecting to MongoDB');
    }
  }
};

export default connectMongodb;
