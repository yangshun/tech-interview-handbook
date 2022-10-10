import { z } from 'zod';
import { Vote } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createProtectedRouter } from './context';

import type { Answer } from '~/types/questions';

export const questionsAnswerRouter = createProtectedRouter()
  .query('getAnswers', {
    input: z.object({
      questionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const answersData = await ctx.prisma.questionsAnswer.findMany({
        include: {
          _count: {
            select: {
              comments: true,
            },
          },
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
      return answersData.map((data) => {
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

        const answer: Answer = {
          content: data.content,
          createdAt: data.createdAt,
          id: data.id,
          numComments: data._count.comments,
          numVotes: votes,
          user: data.user?.name ?? '',
        };
        return answer;
      });
    },
  })
  .query('getAnswerById', {
    input: z.object({
      answerId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const answerData = await ctx.prisma.questionsAnswer.findUnique({
        include: {
          _count: {
            select: {
              comments: true,
            },
          },
          user: {
            select: {
              name: true,
            },
          },
          votes: true,
        },
        where: {
          id: input.answerId,
        },
      });
      if (!answerData) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Answer not found',
        });
      }
      const votes: number = answerData.votes.reduce(
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

      const answer: Answer = {
        content: answerData.content,
        createdAt: answerData.createdAt,
        id: answerData.id,
        numComments: answerData._count.comments,
        numVotes: votes,
        user: answerData.user?.name ?? '',
      };
      return answer;
    },
  })
  .mutation('create', {
    input: z.object({
      content: z.string(),
      questionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      return await ctx.prisma.questionsAnswer.create({
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

      return await ctx.prisma.questionsAnswerVote.create({
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

      const voteToUpdate = await ctx.prisma.questionsAnswerVote.findUnique({
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

      return await ctx.prisma.questionsAnswerVote.update({
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

      const voteToDelete = await ctx.prisma.questionsAnswerVote.findUnique({
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

      return await ctx.prisma.questionsAnswerVote.delete({
        where: {
          id: input.id,
        },
      });
    },
  });
