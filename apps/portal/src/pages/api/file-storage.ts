import formidable from 'formidable';
import * as fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { env } from '~/env/server.mjs';
import { supabase } from '~/utils/supabase';

const BASE_URL = `${env.SUPABASE_URL}/storage/v1/object/public`;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const form = formidable({ keepExtensions: true });
      form.parse(req, async (err, fields, files) => {
        if (err) {
          throw err;
        }

        const { key } = fields;
        const { file } = files;

        const parsedFile: formidable.File =
          file instanceof Array ? file[0] : file;
        const filePath = `${Date.now()}-${parsedFile.originalFilename}`;
        const convertedFile = fs.readFileSync(parsedFile.filepath);

        const { error } = await supabase.storage
          .from(key as string)
          .upload(filePath, convertedFile);

        if (error) {
          throw error;
        }

        return res.status(200).json({
          url: `${BASE_URL}/${key}/${filePath}`,
        });
      });
    } catch (error: unknown) {
      return Promise.reject(error);
    }
  }

  // See if we need this
  if (req.method === 'GET') {
    const { key, filePath } = req.query;

    const { data, error } = await supabase.storage
      .from(key as string)
      .download(filePath as string);

    if (error) {
      throw error;
    }

    res.status(200).write(data);
  }
}
