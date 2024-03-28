import { MongoClient } from 'mongodb';
import { mongodbUrl } from './baseUrl';

export default async function handler(req, res) {
  // only POST method is acceptable
  if (req.method !== 'POST') {
    res.status(501).json({ message: 'Invalid access' });
    return;
  }

  const { email, name, message } = req.body;
  console.log('data from client:', req.body);

  if (
    !email ||
    !email.includes('@') ||
    !name ||
    name.trim() === '' ||
    !message ||
    message.trim() === ''
  ) {
    res.status(422).json({ message: 'Invalid input.' });
    return;
  }

  const newMessage = {
    email,
    message,
    name,
  };

  // connect to mongodb
  let client;
  try {
    client = await MongoClient.connect(mongodbUrl);
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to database.' });
    return;
  }

  // insert data into mongodb
  try {
    const db = client.db();
    const result = await db.collection('messages').insertOne(newMessage);
    newMessage.id = result.insertedId;
    res
      .status(201)
      .json({ message: 'Successfully stored message!', saved: newMessage });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Stroing message failed!' });
    return;
  } finally {
    client.close();
  }
}
