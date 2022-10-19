import { z } from 'zod';
import type { ResumesCommentVote } from '@prisma/client';
import { Vote } from '@prisma/client';

import { createRouter } from '../context';

import type { ResumeComment } from '~/types/resume-comments';

export const resumeCommentsRouter = createRouter().query('list', {
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
        user: {
          select: {
            image: true,
            name: true,
          },
        },
        votes: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        resumeId,
      },
    });

    return comments.map((data) => {
      let userVote: ResumesCommentVote | undefined = undefined;
      let numVotes = 0;

      data.votes.forEach((vote) => {
        numVotes += vote.value === Vote.UPVOTE ? 1 : -1;
        userVote = vote.userId === userId ? vote : undefined;
      });

      const comment: ResumeComment = {
        createdAt: data.createdAt,
        description: data.description,
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
        userVote,
      };

      return comment;
    });
  },
});
