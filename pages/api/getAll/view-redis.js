import client from '../../../lib/redis';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Get all keys from Redis
      const keys = await client.keys('*');
      const data = {};

      // Loop through each key and get its value
      for (const key of keys) {
        const value = await client.get(key);
        data[key] = value;
      }

      // Return the data as JSON
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving data from Redis' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
