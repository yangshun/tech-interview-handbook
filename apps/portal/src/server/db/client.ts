// Src/server/db/client.ts
import { PrismaClient } from '@prisma/client';

import { env } from '~/env/server.mjs';

declare global {
  // eslint-disable-next-line no-var, init-declarations
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
