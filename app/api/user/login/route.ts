import { NextResponse } from "next/server";
import clientPromise from "@/app/Modal/mongodb";

// Define a POST handler function
export async function POST(req: Request, res: Response) {
  // Wait for the MongoDB client to connect
  const client = await clientPromise;

  // Access the "db-blog" database
  const db = client.db("db-blog");

  // Parse the request body as JSON to extract user data
  const data = await req.json();

  // Try to find a user with the provided email and password in the "user" collection
  const result = await db
    .collection("user")
    .findOne({ email: data.email, password: data.password });

  // If no user is found, return a JSON response with an error message and a 401 status (Unauthorized)
  if (!result) {
    return NextResponse.json(
      { error: "email or password is not correct" },
      { status: 401 }
    );
  }

  // If a user is found, retrieve their data and return it in a JSON response with a 200 status
  const user = await db.collection("user").findOne(data);
  return NextResponse.json({ status: 200, data: user });
}
