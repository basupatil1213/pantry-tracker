import mongoose from "mongoose";


// db connect

const dbConnect = async () => {
  try {

    const conn = await mongoose.connect(process.env.MONGO_URI!,{
      dbName: 'pantry-db',
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error : any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;