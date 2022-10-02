// Example of a restricted endpoint that only authenticated users can access from https://next-auth.js.org/getting-started/example

import type { NextApiRequest, NextApiResponse } from 'next';

import { getServerAuthSession } from '~/server/common/get-server-auth-session';

const restricted = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (session) {
    res.send({
      content:
        'This is protected content. You can access this content because you are signed in.',
    });
  } else {
    res.send({
      error:
        'You must be signed in to view the protected content on this page.',
    });
  }
};

export default restricted;
