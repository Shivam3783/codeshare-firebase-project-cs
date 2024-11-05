import client from '../../../lib/redis';

export default async function handler(req, res) {
  const { slug } = req.query;

  if (req.method === 'POST') {
    const { text } = req.body;
    try {
      // Save the text in Redis with a 1-hour expiration
      await client.setEx(slug, 3600, text);
      res.status(200).json({ message: 'Text saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error saving text' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
