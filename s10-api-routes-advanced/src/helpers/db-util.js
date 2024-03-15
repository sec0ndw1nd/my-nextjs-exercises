import { mongoUrl } from '@/pages/api/baseUrl';
import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const client = await MongoClient.connect(mongoUrl);
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}
