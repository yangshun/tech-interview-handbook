import { createNextApiHandler } from '@trpc/server/adapters/next';

import { env } from '~/env/server.mjs';
import { appRouter } from '~/server/router';
import { createContext } from '~/server/router/context';

// Export API handler
export default createNextApiHandler({
  createContext,
  onError:
    env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined,
  router: appRouter,
});
