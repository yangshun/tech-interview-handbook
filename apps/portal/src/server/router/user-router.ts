import { z } from 'zod';

import { createProtectedRouter } from './context';

export const userRouter = createProtectedRouter().mutation(
  'settings.profile.update',
  {
    input: z.object({
      name: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      return await ctx.prisma.user.update({
        data: {
          name: input.name,
        },
        where: {
          id: userId,
        },
      });
    },
  },
);
