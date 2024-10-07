import dbConnect from "@/config/database";
import PostModel from "@/models/postModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    console.log("Received request body:", body);

    const { prompt, msg, name } = body;

    console.log("Extracted values:", { prompt, msg, name });

    if (!prompt || !msg || !name) {
      console.log("Missing required fields:", { prompt, msg, name });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }


    const newPost = await PostModel.create({
      prompt,
      msg,
      name
    });

    console.log("Created new post:", newPost);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error saving response:", error);
    return NextResponse.json(
      { error: "Failed to save response" },
      { status: 500 }
    );
  }
}
