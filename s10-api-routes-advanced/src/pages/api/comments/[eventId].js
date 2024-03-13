import { MongoClient } from 'mongodb';
import { mongoUrl } from '../baseUrl';

export default async function handler(req, res) {
  const { eventId } = req.query;

  console.log('********** From Client:', req.body, eventId);

  const client = await MongoClient.connect(mongoUrl);
  const db = client.db();

  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim().length === 0 ||
      !text ||
      text.trim().length === 0
    ) {
      res.status(422).json({ message: 'Invalid input values' });
      client.close();
      return;
    }

    const newComment = {
      eventId,
      email,
      name,
      text,
    };

    const result = await db.collection('comments').insertOne(newComment);
    newComment.id = result.insertedId;

    res.status(201).json({ message: 'Added comment.', comment: newComment });
  } else if (req.method === 'GET') {
    const comments = await db
      .collection('comments')
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments });
  }

  client.close();
}
