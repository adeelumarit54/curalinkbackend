import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("⚡ MongoDB already connected");
      return;
    }

    const MONGO_URI = process.env.MONGO_URI; // Make sure .env has a DB name
    const conn = await mongoose.connect(MONGO_URI, {
      // these options are optional with Node 4+
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host} 🚀`);
  } catch (err) {
    console.error(`❌ DB connection error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
