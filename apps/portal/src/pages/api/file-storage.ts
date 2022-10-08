import axios from 'axios';
import { formidable } from 'formidable';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

import { env } from '~/env/server.mjs';

const BASE_URL = `${env.SUPABASE_URL}/storage/v1/object`;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const headers = {
    'Content-Type': 'multipart/form-data',
    apiKey: env.SUPABASE_ANON_KEY,
    authorization: 'Bearer ' + env.SUPABASE_ANON_KEY,
  };

  if (req.method === 'POST') {
    try {
      const form = formidable({ multiples: false });
      form.parse(req, async (err, fields, files) => {
        if (err) {
          throw err;
        }
        const { file } = files;
        const actualFile = file instanceof Array ? file[0] : file;
        const filePath = `${uuidv4()}-${actualFile.originalFilename}`;
        const { key } = fields;

        const data = await axios.post(
          `${BASE_URL}/${key}/${filePath}`,
          actualFile,
          {
            headers,
          },
        );
        return res.status(200).json({
          url: data.data.key,
        });
      });
    } catch (error: unknown) {
      return Promise.reject(error);
    }
  }

  if (req.method === 'GET') {
    const { key, filePath } = req.query;
    const data = await axios.get(`${BASE_URL}/public/${key}/${filePath}`);
    res.status(200).json(data);
  }
}
