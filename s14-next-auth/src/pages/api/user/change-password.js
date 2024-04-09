// import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { hashPassword, verifyPassword } from '@/lib/auth';
import connectToDatabase from '@/lib/db';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') return;

  // ? In api routes, you have to use getServerSession instead of getSession.
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const userEmail = session.user.email;
  const { newPassword, oldPassword } = req.body;

  // connect to db
  const client = await connectToDatabase();
  const userCollection = client.db().collection('users');

  // check existing user
  const user = await userCollection.findOne({ email: userEmail });
  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }

  // check oldPassword === user.password
  const isValidPassword = await verifyPassword(oldPassword, user.password);
  if (!isValidPassword) {
    res.status(422).json({ message: 'Invalid password.' });
    client.close();
    return;
  }

  // update db
  const hashedNewPassword = await hashPassword(newPassword);
  const result = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedNewPassword } },
  );
  console.log('**** db updated!', result);

  client.close();
  res.status(200).json({ message: 'Password updated!' });
}
