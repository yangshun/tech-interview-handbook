import formidable from 'formidable';
import * as fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { env } from '~/env/server.mjs';
import { supabase } from '~/utils/supabase';

export const config = {
  api: {
    bodyParser: false,
  },
};

const BASE_FILE_URL = `${env.SUPABASE_URL}/storage/v1/object/public`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'POST') {
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

        return res.status(201).json({
          url: `${BASE_FILE_URL}/${key}/${filePath}`,
        });
      });
    } else if (req.method === 'DELETE') {
      const { key, fileUrl } = req.query;
      const storageKey = key as string;
      const url = fileUrl as string;

      const filePath = url.substring(url.lastIndexOf('/') + 1);

      const { error } = await supabase.storage
        .from(storageKey)
        .remove([filePath]);

      if (error) {
        throw error;
      }

      return res.status(200).json({
        message: `File ${filePath} has been deleted`,
      });
    }
  } catch (error: unknown) {
    return Promise.reject(error);
  }
}
