import { z } from 'zod';
import { QuestionsQuestionType, Vote } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createProtectedRouter } from '../context';

export const questionsQuestionUserRouter = createProtectedRouter()
  .mutation('create', {
    input: z.object({
      companyId: z.string(),
      content: z.string(),
      location: z.string(),
      questionType: z.nativeEnum(QuestionsQuestionType),
      role: z.string(),
      seenAt: z.date(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      return await ctx.prisma.questionsQuestion.create({
        data: {
          content: input.content,
          encounters: {
            create: {
              company: {
                connect: {
                  id: input.companyId,
                },
              },
              location: input.location,
              role: input.role,
              seenAt: input.seenAt,
              user: {
                connect: {
                  id: userId,
                },
              },
            },
          },
          lastSeenAt: input.seenAt,
          questionType: input.questionType,
          userId,
        },
      });
    },
  })
  .mutation('update', {
    input: z.object({
      content: z.string().optional(),
      id: z.string(),
      questionType: z.nativeEnum(QuestionsQuestionType).optional(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const questionToUpdate = await ctx.prisma.questionsQuestion.findUnique({
        where: {
          id: input.id,
        },
      });

      if (questionToUpdate?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
          // Optional: pass the original error to retain stack trace
        });
      }

      const { content, questionType } = input;

      return await ctx.prisma.questionsQuestion.update({
        data: {
          content,
          questionType,
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

      const questionToDelete = await ctx.prisma.questionsQuestion.findUnique({
        where: {
          id: input.id,
        },
      });

      if (questionToDelete?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
          // Optional: pass the original error to retain stack trace
        });
      }

      return await ctx.prisma.questionsQuestion.delete({
        where: {
          id: input.id,
        },
      });
    },
  })
  .query('getVote', {
    input: z.object({
      questionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { questionId } = input;

      return await ctx.prisma.questionsQuestionVote.findUnique({
        where: {
          questionId_userId: { questionId, userId },
        },
      });
    },
  })
  .mutation('createVote', {
    input: z.object({
      questionId: z.string(),
      vote: z.nativeEnum(Vote),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { questionId, vote } = input;

      const incrementValue = vote === Vote.UPVOTE ? 1 : -1;

      const [questionVote] = await ctx.prisma.$transaction([
        ctx.prisma.questionsQuestionVote.create({
          data: {
            questionId,
            userId,
            vote,
          },
        }),
        ctx.prisma.questionsQuestion.update({
          data: {
            upvotes: {
              increment: incrementValue,
            },
          },
          where: {
            id: questionId,
          },
        }),
      ]);
      return questionVote;
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

      const voteToUpdate = await ctx.prisma.questionsQuestionVote.findUnique({
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

      const [questionVote] = await ctx.prisma.$transaction([
        ctx.prisma.questionsQuestionVote.update({
          data: {
            vote,
          },
          where: {
            id,
          },
        }),
        ctx.prisma.questionsQuestion.update({
          data: {
            upvotes: {
              increment: incrementValue,
            },
          },
          where: {
            id: voteToUpdate.questionId,
          },
        }),
      ]);

      return questionVote;
    },
  })
  .mutation('deleteVote', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const voteToDelete = await ctx.prisma.questionsQuestionVote.findUnique({
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

      const [questionVote] = await ctx.prisma.$transaction([
        ctx.prisma.questionsQuestionVote.delete({
          where: {
            id: input.id,
          },
        }),
        ctx.prisma.questionsQuestion.update({
          data: {
            upvotes: {
              increment: incrementValue,
            },
          },
          where: {
            id: voteToDelete.questionId,
          },
        }),
      ]);
      return questionVote;
    },
  });
