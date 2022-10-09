import { z } from 'zod';

import { createProtectedRouter } from '../context';

export const resumesStarUserRouter = createProtectedRouter().mutation(
  'create_or_delete',
  {
    input: z.object({
      resumeId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { resumeId } = input;
      // Update_star will only be called if user is logged in
      const userId = ctx.session!.user!.id;

      // Use the resumeId and resumeProfileId to check if star exists
      const resumesStar = await ctx.prisma.resumesStar.findUnique({
        select: {
          id: true,
        },
        where: {
          userId_resumeId: {
            resumeId,
            userId,
          },
        },
      });

      if (resumesStar === null) {
        return await ctx.prisma.resumesStar.create({
          data: {
            resumeId,
            userId,
          },
        });
      }
      return await ctx.prisma.resumesStar.delete({
        where: {
          userId_resumeId: {
            resumeId,
            userId,
          },
        },
      });
    },
  },
);
