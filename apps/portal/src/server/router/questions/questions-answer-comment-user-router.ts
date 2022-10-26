import { z } from 'zod';
import { Vote } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createProtectedRouter } from '../context';

export const questionsAnswerCommentUserRouter = createProtectedRouter()
  .mutation('create', {
    input: z.object({
      answerId: z.string(),
      content: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const { answerId, content } = input;

      return await ctx.prisma.questionsAnswerComment.create({
        data: {
          answerId,
          content,
          userId,
        },
      });
    },
  })
  .mutation('update', {
    input: z.object({
      content: z.string().optional(),
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const answerCommentToUpdate =
        await ctx.prisma.questionsAnswerComment.findUnique({
          where: {
            id: input.id,
          },
        });

      if (answerCommentToUpdate?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      const { content } = input;
      return await ctx.prisma.questionsAnswerComment.update({
        data: {
          content,
        },
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const answerCommentToDelete =
        await ctx.prisma.questionsAnswerComment.findUnique({
          where: {
            id: input.id,
          },
        });

      if (answerCommentToDelete?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.questionsAnswerComment.delete({
        where: {
          id: input.id,
        },
      });
    },
  })
  .query('getVote', {
    input: z.object({
      answerCommentId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { answerCommentId } = input;

      return await ctx.prisma.questionsAnswerCommentVote.findUnique({
        where: {
          answerCommentId_userId: { answerCommentId, userId },
        },
      });
    },
  })
  .mutation('createVote', {
    input: z.object({
      answerCommentId: z.string(),
      vote: z.nativeEnum(Vote),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const { answerCommentId, vote } = input;

      const incrementValue = vote === Vote.UPVOTE ? 1 : -1;

      const [answerCommentVote] = await ctx.prisma.$transaction([
        ctx.prisma.questionsAnswerCommentVote.create({
          data: {
            answerCommentId,
            userId,
            vote,
          },
        }),
        ctx.prisma.questionsAnswerComment.update({
          data: {
            upvotes: {
              increment: incrementValue,
            },
          },
          where: {
            id: answerCommentId,
          },
        }),
      ]);

      return answerCommentVote;
    },
  })
  .mutation('updateVote', {
    input: z.object({
      id: z.string(),
      vote: z.nativeEnum(Vote),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { id, vote } = input;

      const voteToUpdate =
        await ctx.prisma.questionsAnswerCommentVote.findUnique({
          where: {
            id: input.id,
          },
        });

      if (voteToUpdate?.userId !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      const incrementValue = vote === Vote.UPVOTE ? 2 : -2;

      const [answerCommentVote] = await ctx.prisma.$transaction([
        ctx.prisma.questionsAnswerCommentVote.update({
          data: {
            vote,
          },
          where: {
            id,
          },
        }),
        ctx.prisma.questionsAnswerComment.update({
          data: {
            upvotes: {
              increment: incrementValue,
            },
          },
          where: {
            id: voteToUpdate.answerCommentId,
          },
        }),
      ]);

      return answerCommentVote;
    },
  })
  .mutation('deleteVote', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const voteToDelete =
        await ctx.prisma.questionsAnswerCommentVote.findUnique({
          where: {
            id: input.id,
          },
        });

      if (voteToDelete?.userId !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      const incrementValue = voteToDelete.vote === Vote.UPVOTE ? -1 : 1;

      const [answerCommentVote] = await ctx.prisma.$transaction([
        ctx.prisma.questionsAnswerCommentVote.delete({
          where: {
            id: input.id,
          },
        }),
        ctx.prisma.questionsAnswerComment.update({
          data: {
            upvotes: {
              increment: incrementValue,
            },
          },
          where: {
            id: voteToDelete.answerCommentId,
          },
        }),
      ]);
      return answerCommentVote;
    },
  });
