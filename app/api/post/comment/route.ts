import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/app/Modal/mongodb";

// Define a PUT handler function
export async function PUT(req: Request, res: Response) {
  // Wait for the MongoDB client to connect
  const client = await clientPromise;

  // Access the "db-blog" database
  const db = client.db("db-blog");

  // Parse the incoming request body as JSON, expecting an object with "_id" and "data"
  const { _id: id, data } = await req.json();

  // Create an ObjectId based on the "_id" received in the request
  const _id = { _id: new ObjectId(id) };

  // Find a post in the "posts" collection using the "_id"
  const post = await db.collection("posts").findOne(_id);

  // Create a new array of comments by adding the new comment and owner to the existing comments
  const newData = [
    ...(post?.comments || []), // Ensure there are existing comments or start with an empty array
    { comment: data?.comment, owner: data?.owner },
  ];

  // Update the post in the "posts" collection with the new comments
  const newPost = await db
    .collection("posts")
    .findOneAndUpdate(_id, { $set: { comments: newData } });

  // Return a JSON response with a 201 status and the updated post data
  return NextResponse.json({ status: 201, data: newPost });
}
