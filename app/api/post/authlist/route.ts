import { NextResponse } from "next/server";
import clientPromise from "@/app/Modal/mongodb";

// Define a POST handler function
export async function POST(req: Request, res: Response) {
  // Wait for the MongoDB client to connect
  const client = await clientPromise;

  // Access the "db-blog" database
  const db = client.db("db-blog");

  // Parse the incoming request body as JSON (assuming it contains owner information)
  const owner = await req.json();

  // Query the "posts" collection in the database to find posts associated with the owner
  const posts = await db.collection("posts").find(owner).toArray();

  // Return a JSON response with the retrieved posts and other metadata
  return NextResponse.json({ status: 200, posts, revalidated: true });
}
