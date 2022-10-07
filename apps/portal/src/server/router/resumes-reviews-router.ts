import { z } from 'zod';

import { createRouter } from './context';

export const resumeReviewsRouter = createRouter().query('list', {
  input: z.object({
    resumeId: z.string(),
  }),
  async resolve({ ctx, input }) {
    const { resumeId } = input;

    const { resumesProfileId } =
      await ctx.prisma.resumesResume.findUniqueOrThrow({
        select: {
          resumesProfileId: true,
        },
        where: {
          id: resumeId,
        },
      });

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
        resumesProfile: {
          include: {
            user: {
              select: {
                image: true,
                name: true,
              },
            },
          },
        },
        votes: {
          take: 1,
          where: {
            resumesProfileId,
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
