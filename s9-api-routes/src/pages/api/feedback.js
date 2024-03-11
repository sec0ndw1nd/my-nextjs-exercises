import fs from 'fs';
import path from 'path';
import { stringify } from 'querystring';

export const getFeedbackPath = () =>
  path.join(process.cwd(), 'data', 'feedback.json');

export const extractData = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, text } = req.body;

    const feedback = {
      id: new Date().toISOString(),
      email,
      text,
    };

    const filePath = getFeedbackPath();
    const data = extractData(filePath);

    data.push(feedback);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: 'Success!', feedback });
  } else {
    const filePath = getFeedbackPath();
    const data = extractData(filePath);
    const dataWithoutEmail = data.map(({ id, text }) => ({ id, text }));
    res.status(200).json({ feedback: dataWithoutEmail });
  }
}
