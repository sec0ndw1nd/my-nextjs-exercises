import { extractData, getFeedbackPath } from './feedback';

export default function handler(req, res) {
  const { feedbackId } = req.query;
  const filePath = getFeedbackPath();
  const data = extractData(filePath);

  const selectedFeedback = data.find((fb) => fb.id === feedbackId);
  res.status(201).json({ message: 'Success!', feedback: selectedFeedback });
}
