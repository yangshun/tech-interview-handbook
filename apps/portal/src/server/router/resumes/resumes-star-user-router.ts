import { z } from 'zod';

import { createProtectedRouter } from '../context';

export const resumesStarUserRouter = createProtectedRouter()
  .mutation('unstar', {
    input: z.object({
      resumeId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { resumeId } = input;
      const userId = ctx.session.user.id;
      return await ctx.prisma.resumesStar.delete({
        where: {
          userId_resumeId: {
            resumeId,
            userId,
          },
        },
      });
    },
  })
  .mutation('star', {
    input: z.object({
      resumeId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { resumeId } = input;
      const userId = ctx.session.user.id;
      return await ctx.prisma.resumesStar.create({
        data: {
          resumeId,
          userId,
        },
      });
    },
  });
