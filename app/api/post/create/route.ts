import { NextResponse } from "next/server";
import clientPromise from "@/app/Modal/mongodb";

// Define a POST handler function
export async function POST(req: Request, res: Response) {
  // Wait for the MongoDB client to connect
  const client = await clientPromise;

  // Access the "db-blog" database
  const db = client.db("db-blog");

  // Parse the incoming request body as JSON
  const data = await req.json();

  // Insert a new document (post) into the "posts" collection with the provided data and an empty comments array
  const { insertedId } = await db
    .collection("posts")
    .insertOne({ ...data, comments: [] });

  // Find the newly inserted post in the "posts" collection using its insertedId
  const post = await db.collection("posts").findOne(insertedId);

  // Return a JSON response with a 201 status and the data of the newly created post
  return NextResponse.json({ status: 201, data: post });
}
