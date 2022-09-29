// Src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../server/db/client';

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const examplesFromDb = await prisma.example.findMany();
  res.status(200).json(examplesFromDb);
};

export default examples;
