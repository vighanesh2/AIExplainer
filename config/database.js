import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState === 1) return; // Already connected

  try {
    await mongoose.connect(process.env.MONGODB_URI, { // Ensure the correct URI is used
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Database connection error");
  }
};

export default dbConnect;
