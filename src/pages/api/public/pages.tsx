// pages/api/posts.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPaginatedPages } from '../../../../lib/themeworld';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cursor, take, topic } = req.query;

  try {
    const paginatedPosts = await getPaginatedPages({
      cursor: cursor ? parseInt(cursor as string) : undefined,
      take: take ? parseInt(take as string) : undefined,
      topic: topic ? topic.toString() : undefined,
    });

    res.status(200).json(paginatedPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching paginated posts' });
  }
}
