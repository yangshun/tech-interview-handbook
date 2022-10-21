import { z } from 'zod';
import type { ResumesCommentVote } from '@prisma/client';
import { Vote } from '@prisma/client';

import { createRouter } from '../context';

import type { ResumeCommentVote } from '~/types/resume-comments';

export const resumesCommentsVotesRouter = createRouter().query('list', {
  input: z.object({
    commentId: z.string(),
  }),
  async resolve({ ctx, input }) {
    const userId = ctx.session?.user?.id;
    const { commentId } = input;

    const votes = await ctx.prisma.resumesCommentVote.findMany({
      where: {
        commentId,
      },
    });

    let userVote: ResumesCommentVote | null = null;
    let numVotes = 0;

    votes.forEach((vote) => {
      numVotes += vote.value === Vote.UPVOTE ? 1 : -1;
      userVote = vote.userId === userId ? vote : null;
    });

    const resumeCommentVote: ResumeCommentVote = {
      numVotes,
      userVote,
    };

    return resumeCommentVote;
  },
});
