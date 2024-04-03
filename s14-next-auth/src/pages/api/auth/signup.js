import { hashPassword } from '@/lib/auth';
import connectToDatabase from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return;

  const { email, password } = req.body;

  // check invalid
  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }

  // connect to db
  const client = await connectToDatabase();
  const db = client.db();

  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    client.close();
    return;
  }

  // hashing password
  const hashedPassword = await hashPassword(password);

  // insert data into db
  try {
    await db.collection('users').insertOne({
      email,
      password: hashedPassword,
    });
    res.status(201).json({ mesage: 'Created User!' });
  } catch (error) {
    console.error('inserting data failed.', error);
  } finally {
    client.close();
  }
}
