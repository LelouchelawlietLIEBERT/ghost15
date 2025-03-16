import connectMongodb from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<Record<string, string>> }  // Changed typing here
) {
  const resolvedParams = await params;  // Await the params Promise
  const { id } = resolvedParams;
  const { newTitle: title, newDescription: description } = await request.json();

  // Validate input
  if (!title || !description) {
    return NextResponse.json({ message: "Title and description are required." }, { status: 400 });
  }

  await connectMongodb();

  try {
    const updatedTopic = await Topic.findByIdAndUpdate(id, { title, description }, { new: true });
    if (!updatedTopic) {
      return NextResponse.json({ message: "Topic not found." }, { status: 404 });
    }
    return NextResponse.json({ message: "Topic Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating topic.", error: error}, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<Record<string, string>> }  // Changed typing here
) {
  const resolvedParams = await params;  // Await the params Promise
  const { id } = resolvedParams;

  await connectMongodb();

  try {
    const topic = await Topic.findById(id);
    if (!topic) {
      return NextResponse.json({ message: "Topic not found." }, { status: 404 });
    }
    return NextResponse.json({ topic }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching topic.", error: error }, { status: 500 });
  }
}