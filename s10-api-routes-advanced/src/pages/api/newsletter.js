import { connectDatabase, insertDocument } from '@/helpers/db-util';

async function checkExistingEmail(client, email) {
  const db = client.db();
  const result = await db.collection('emails').find({ email: email }).toArray();
  return result.length > 0;
}

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

    // connect db
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the db failed!' });
      return;
    }

    // insert email if not existing
    try {
      const isExistingEmail = await checkExistingEmail(client, userEmail);
      if (!isExistingEmail) {
        await insertDocument(client, 'emails', { email: userEmail });
      }

      res.status(201).json({
        message: isExistingEmail ? 'You already signed up.' : 'Signed up!',
      });
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
    } finally {
      client.close();
    }
  }
}
