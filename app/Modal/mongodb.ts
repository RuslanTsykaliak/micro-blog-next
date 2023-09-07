import { MongoClient } from "mongodb";


if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI must be set');
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // Use a global variable to reuse the client connection during development.
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    // Create a new client and connect if the promise doesn't exist.
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // Create a new client and connect in other environments.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
