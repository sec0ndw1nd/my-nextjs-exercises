import { MongoClient } from 'mongodb';
import { mongoUrl } from './baseUrl';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;
    console.log('************ From Client:', userEmail);

    if (
      !userEmail ||
      !userEmail.includes('@') ||
      userEmail.trim().length === 0
    ) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    const client = await MongoClient.connect(mongoUrl);
    const db = client.db();

    const isExistEmail =
      (await db.collection('emails').find({ email: userEmail }).toArray())
        .length > 0;

    if (!isExistEmail) {
      await db.collection('emails').insertOne({ email: userEmail });
    }

    client.close();

    res.status(201).json({
      message: isExistEmail ? 'You already signed up.' : 'Signed up!',
    });
  }
}
