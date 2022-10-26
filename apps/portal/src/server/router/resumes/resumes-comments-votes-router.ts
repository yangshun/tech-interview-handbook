import { z } from 'zod';
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

    const userVotes = votes.filter((vote) => vote.userId === userId);
    const userVote = userVotes.length > 0 ? userVotes[0] : null;
    const numVotes = votes
      .map((vote) => (vote.value === Vote.UPVOTE ? 1 : -1))
      .reduce((result, current) => {
        return result + current;
      }, 0);

    const resumeCommentVote: ResumeCommentVote = {
      numVotes,
      userVote,
    };

    return resumeCommentVote;
  },
});
