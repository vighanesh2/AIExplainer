'use server'

import PostModel from "@/models/postModel"
import connectDB from "@/config/database"

export async function getPosts(){
  try {
    await connectDB();
    console.log("Database connected successfully."); 
    const data = JSON.parse(JSON.stringify(await PostModel.find()));

    return { data }
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    return { errMsg: error.message }
  }
}
