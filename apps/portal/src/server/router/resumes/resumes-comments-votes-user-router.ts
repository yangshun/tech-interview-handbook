import { z } from 'zod';
import { Vote } from '@prisma/client';

import { createProtectedRouter } from '../context';

export const resumesCommentsVotesUserRouter = createProtectedRouter()
  .mutation('upsert', {
    input: z.object({
      commentId: z.string(),
      value: z.nativeEnum(Vote),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id;
      const { commentId, value } = input;

      await ctx.prisma.resumesCommentVote.upsert({
        create: {
          commentId,
          userId,
          value,
        },
        update: {
          value,
        },
        where: {
          userId_commentId: { commentId, userId },
        },
      });
    },
  })
  .mutation('delete', {
    input: z.object({
      commentId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id;
      const { commentId } = input;

      await ctx.prisma.resumesCommentVote.delete({
        where: {
          userId_commentId: { commentId, userId },
        },
      });
    },
  });
