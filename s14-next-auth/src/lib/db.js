import { MongoClient } from 'mongodb';
import mongodbUrl from './baseUrl';

export default async function connectToDatabase() {
  const client = await MongoClient.connect(mongodbUrl);
  return client;
}
