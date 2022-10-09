import formidable from 'formidable';
import * as fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '~/utils/supabase';

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
          url: filePath,
        });
      });
    } catch (error: unknown) {
      return Promise.reject(error);
    }
  }

  if (req.method === 'GET') {
    const { key, url } = req.query;

    const { data, error } = await supabase.storage
      .from(`public/${key as string}`)
      .download(url as string);

    if (error || data == null) {
      throw error;
    }

    const arrayBuffer = await data.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.status(200).send(buffer);
  }
}
