import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const settings = req.body;

    fs.writeFile(path.resolve('./settings.json'), JSON.stringify(settings), (err) => {
      if (err) {
        res.status(500).json({ message: 'Error writing file' });
      } else {
        res.status(200).json({ message: 'Successfully wrote file' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}