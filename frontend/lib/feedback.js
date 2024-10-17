// pages/api/feedback.js
import { feedback } from "../../controllers/feedback.controller";

export default function handler(req, res) {
  if (req.method === 'POST') {
    return feedback(req, res);
  }

  // Handle any other HTTP methods, or send a 405 Method Not Allowed status
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
