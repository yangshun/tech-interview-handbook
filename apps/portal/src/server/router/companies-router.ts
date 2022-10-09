import { z } from 'zod';

import { createRouter } from './context';

export const companiesRouter = createRouter().query('list', {
  input: z.object({
    name: z.string(),
  }),
  async resolve({ ctx, input }) {
    return await ctx.prisma.company.findMany({
      orderBy: {
        name: 'desc',
      },
      take: 10,
      where: {
        name: {
          contains: input.name,
          mode: 'insensitive',
        },
      },
    });
  },
});
