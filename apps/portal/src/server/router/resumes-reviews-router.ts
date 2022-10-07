import { z } from 'zod';

import { createRouter } from './context';

export const resumeReviewsRouter = createRouter().query('list', {
  input: z.object({
    resumeId: z.string(),
  }),
  async resolve({ ctx, input }) {
    const userId = ctx.session?.user?.id;
    const { resumeId } = input;

    // For this resume, we retrieve every comment's information, along with:
    // The user's name and image to render
    // Number of votes, and whether the user (if-any) has voted
    return await ctx.prisma.resumesComment.findMany({
      include: {
        _count: {
          select: {
            votes: true,
          },
        },
        user: {
          select: {
            image: true,
            name: true,
          },
        },
        votes: {
          take: 1,
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        resumeId,
      },
    });
  },
});
