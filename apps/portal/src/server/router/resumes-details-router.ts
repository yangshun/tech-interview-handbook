import { z } from 'zod';

import { createRouter } from './context';

export const resumesDetailsRouter = createRouter()
  .query('find', {
    input: z.object({
      resumeId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { resumeId } = input;
      const userId = ctx.session?.user?.id;

      // Use the resumeId to query all related information of a single resume
      // from Resumesresume:
      return await ctx.prisma.resumesResume.findUnique({
        include: {
          _count: {
            select: {
              stars: true,
            },
          },
          stars: {
            where: {
              userId,
            },
          },
          user: {
            select: {
              name: true,
            },
          },
        },
        where: {
          id: resumeId,
        },
      });
    },
  })
  .mutation('update_star', {
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
  });
