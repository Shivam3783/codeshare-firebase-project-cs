import client from '../../../lib/redis';

export default async function handler(req, res) {
  const { slug } = req.query;

  if (req.method === 'GET') {
    try {
      const text = await client.get(slug);
      if (text) {
        res.status(200).json({ text });
      } else {
        res.status(404).json({ message: 'No text found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving text' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
