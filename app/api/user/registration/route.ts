import { NextResponse } from "next/server";
import clientPromise from "@/app/Modal/mongodb";

// Define a POST handler function
export async function POST(req: Request, res: Response) {
  // Wait for the MongoDB client to connect
  const client = await clientPromise;

  // Access the "db-blog" database
  const db = client.db("db-blog");

  // Parse the request body as JSON to extract user registration data (credentials)
  const credentials = await req.json();

  // Check if a user with the provided email already exists in the "user" collection
  const result = await db
    .collection("user")
    .findOne({ email: credentials.email });

  // If a user with the same email exists, return a JSON response with an error message and a 409 status (Conflict)
  if (result) {
    return NextResponse.json(
      { error: "This user already exists" },
      { status: 409 }
    );
  }

  // Insert the new user's credentials into the "user" collection and retrieve the inserted user's data
  const { insertedId } = await db.collection("user").insertOne(credentials);
  const user = await db.collection("user").findOne(insertedId);

  // Return a JSON response with a 200 status code indicating successful registration
  return NextResponse.json({ status: 200, data: user });
}
