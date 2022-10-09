import { z } from 'zod';
import { Vote } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createProtectedRouter } from './context';

import type { QuestionComment } from '~/types/questions';

export const questionsQuestionCommentRouter = createProtectedRouter()
  .query('getQuestionComments', {
    input: z.object({
      questionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const questionCommentsData =
        await ctx.prisma.questionsQuestionComment.findMany({
          include: {
            user: {
              select: {
                name: true,
              },
            },
            votes: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          where: {
            ...input,
          },
        });
      return questionCommentsData.map((data) => {
        const votes: number = data.votes.reduce(
          (previousValue: number, currentValue) => {
            let result: number = previousValue;

            switch (currentValue.vote) {
              case Vote.UPVOTE:
                result += 1;
                break;
              case Vote.DOWNVOTE:
                result -= 1;
                break;
            }
            return result;
          },
          0,
        );

        const questionComment: QuestionComment = {
          content: data.content,
          createdAt: data.createdAt,
          id: data.id,
          numVotes: votes,
          user: data.user?.name ?? '',
        };
        return questionComment;
      });
    },
  })
  .mutation('create', {
    input: z.object({
      content: z.string(),
      questionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      return await ctx.prisma.questionsQuestionComment.create({
        data: {
          ...input,
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

      const questionCommentToUpdate =
        await ctx.prisma.questionsQuestionComment.findUnique({
          where: {
            id: input.id,
          },
        });

      if (questionCommentToUpdate?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.questionsQuestionComment.update({
        data: {
          ...input,
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

      const questionCommentToDelete =
        await ctx.prisma.questionsQuestionComment.findUnique({
          where: {
            id: input.id,
          },
        });

      if (questionCommentToDelete?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.questionsQuestionComment.delete({
        where: {
          id: input.id,
        },
      });
    },
  })
  .query('getVote', {
    input: z.object({
      questionCommentId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { questionCommentId } = input;

      return await ctx.prisma.questionsQuestionCommentVote.findUnique({
        where: {
          questionCommentId_userId: { questionCommentId, userId },
        },
      });
    },
  })
  .mutation('createVote', {
    input: z.object({
      questionCommentId: z.string(),
      vote: z.nativeEnum(Vote),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      return await ctx.prisma.questionsQuestionCommentVote.create({
        data: {
          ...input,
          userId,
        },
      });
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
        await ctx.prisma.questionsQuestionCommentVote.findUnique({
          where: {
            id: input.id,
          },
        });

      if (voteToUpdate?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.questionsQuestionCommentVote.update({
        data: {
          vote,
        },
        where: {
          id,
        },
      });
    },
  })
  .mutation('deleteVote', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const voteToDelete =
        await ctx.prisma.questionsQuestionCommentVote.findUnique({
          where: {
            id: input.id,
          },
        });

      if (voteToDelete?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.questionsQuestionCommentVote.delete({
        where: {
          id: input.id,
        },
      });
    },
  });
