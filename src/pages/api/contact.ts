// /pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log('New contact message:', { name, email, subject, message });
    return res.status(200).json({ message: 'Message received' });
  }

  // For unsupported methods, also send JSON
  res.setHeader('Allow', ['POST']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}

