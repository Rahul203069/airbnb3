
// @ts-nocheck
import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://rs3296471t:flqRiXltxjPhnh1h@cluster100.gnswa.mongodb.net/test";

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedClient = client;
  cachedDb = client.connection;

  return { client, db: cachedDb };
}