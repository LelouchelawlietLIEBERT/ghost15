import connectMongodb from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

interface RequestBody {
  title: string;
  description: string;
}

export async function POST(request: Request){
  const {title,description}: RequestBody = await request.json(); 
  await connectMongodb();
  await Topic.create({title,description});
  return NextResponse.json({message:"Topic Created"},{status:201});
}

export async function GET(){
  await connectMongodb();
  const topics = await Topic.find();
  return NextResponse.json({topics});
}

export async function DELETE(request: Request){
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  await connectMongodb();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({message:"Topic Deleted"},{status:201})
}
