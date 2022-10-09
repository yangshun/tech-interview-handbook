import { z } from 'zod';

import { createRouter } from './context';

import type { ResumeComment } from '~/types/resume-comments';

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
    const comments = await ctx.prisma.resumesComment.findMany({
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

    return comments.map((data) => {
      const hasVoted = data.votes.length > 0;
      const numVotes = data._count.votes;

      const comment: ResumeComment = {
        createdAt: data.createdAt,
        description: data.description,
        hasVoted,
        id: data.id,
        numVotes,
        resumeId: data.resumeId,
        section: data.section,
        updatedAt: data.updatedAt,
        user: {
          image: data.user.image,
          name: data.user.name,
          userId: data.userId,
        },
      };

      return comment;
    });
  },
});
