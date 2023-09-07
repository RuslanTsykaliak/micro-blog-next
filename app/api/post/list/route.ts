import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import clientPromise from "@/app/Modal/mongodb";

// Define a POST handler function
export async function POST(req: Request, res: Response) {
  // Wait for the MongoDB client to connect
  const client = await clientPromise;

  // Access the "db-blog" database
  const db = client.db("db-blog");

  // Fetch all documents (posts) from the "posts" collection and convert them to an array
  const posts = await db.collection("posts").find({}).toArray();

  // Trigger a revalidation of the "blog" cache tag
  revalidateTag("blog");

  // Return a JSON response with a 200 status and the array of posts
  return NextResponse.json({
    status: 200,
    posts,
  });
}
