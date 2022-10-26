import { z } from 'zod';
import { Vote } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createProtectedRouter } from '../context';

export const questionsAnswerUserRouter = createProtectedRouter()
  .mutation('create', {
    input: z.object({
      content: z.string(),
      questionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const { content, questionId } = input;

      return await ctx.prisma.questionsAnswer.create({
        data: {
          content,
          questionId,
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
      const { content, id } = input;

      const answerToUpdate = await ctx.prisma.questionsAnswer.findUnique({
        where: {
          id: input.id,
        },
      });

      if (answerToUpdate?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.questionsAnswer.update({
        data: {
          content,
        },
        where: {
          id,
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

      const answerToDelete = await ctx.prisma.questionsAnswer.findUnique({
        where: {
          id: input.id,
        },
      });

      if (answerToDelete?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.questionsAnswer.delete({
        where: {
          id: input.id,
        },
      });
    },
  })
  .query('getVote', {
    input: z.object({
      answerId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { answerId } = input;

      return await ctx.prisma.questionsAnswerVote.findUnique({
        where: {
          answerId_userId: { answerId, userId },
        },
      });
    },
  })
  .mutation('createVote', {
    input: z.object({
      answerId: z.string(),
      vote: z.nativeEnum(Vote),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const { answerId, vote } = input;

      const incrementValue = vote === Vote.UPVOTE ? 1 : -1;

      const [answerVote] = await ctx.prisma.$transaction([
        ctx.prisma.questionsAnswerVote.create({
          data: {
            answerId,
            userId,
            vote,
          },
        }),
        ctx.prisma.questionsAnswer.update({
          data: {
            upvotes: {
              increment: incrementValue,
            },
          },
          where: {
            id: answerId,
          },
        }),
      ]);
      return answerVote;
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

      const voteToUpdate = await ctx.prisma.questionsAnswerVote.findUnique({
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

      const [questionsAnswerVote] = await ctx.prisma.$transaction([
        ctx.prisma.questionsAnswerVote.update({
          data: {
            vote,
          },
          where: {
            id,
          },
        }),
        ctx.prisma.questionsAnswer.update({
          data: {
            upvotes: {
              increment: incrementValue,
            },
          },
          where: {
            id: voteToUpdate.answerId,
          },
        }),
      ]);

      return questionsAnswerVote;
    },
  })
  .mutation('deleteVote', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const voteToDelete = await ctx.prisma.questionsAnswerVote.findUnique({
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

      const [questionsAnswerVote] = await ctx.prisma.$transaction([
        ctx.prisma.questionsAnswerVote.delete({
          where: {
            id: input.id,
          },
        }),
        ctx.prisma.questionsAnswer.update({
          data: {
            upvotes: {
              increment: incrementValue,
            },
          },
          where: {
            id: voteToDelete.answerId,
          },
        }),
      ]);
      return questionsAnswerVote;
    },
  });
