import { connectDatabase, insertDocument } from '@/helpers/db-util';

async function getComments(client) {
  const db = client.db();
  return await db.collection('comments').find().sort({ _id: -1 }).toArray();
}

export default async function handler(req, res) {
  const { eventId } = req.query;

  console.log('********** From Client:', req.body, eventId);

  // connect db
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the db failed!' });
    return;
  }

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

    try {
      const result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res
        .status(201)
        .json({
          message: 'Your comment submitted successfully!',
          comment: newComment,
        });
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
    } finally {
      client.close();
    }
  } else if (req.method === 'GET') {
    try {
      const comments = await getComments(client);
      const filteredComments = comments.filter(
        (comm) => comm.eventId === eventId,
      );
      res.status(200).json({ comments: filteredComments });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed!' });
    } finally {
      client.close();
    }
  }
}
