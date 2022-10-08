import { z } from 'zod';
import {QuestionsVote } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createProtectedRouter } from './context';

import type { QuestionComment } from '~/types/questions-question';

export const questionsQuestionCommentRouter = createProtectedRouter()
  .query('getQuestionComments', {
    input: z.object({
      questionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const questionCommentsData = await ctx.prisma.questionsQuestionComment.findMany({
        include: {
        _count: {
          select: {
            votes: true,
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
    return questionCommentsData.map((data) => {
      const votes:number = data.votes.reduce(
        (previousValue:number, currentValue) => {
          let result:number = previousValue;

          switch(currentValue.vote) {
          case QuestionsVote.NO_VOTE:
            break;
          case QuestionsVote.UPVOTE:
            result += 1
            break;
          case QuestionsVote.DOWNVOTE:
            result -= 1
            break;
          }
          return result;
        },
        0
        );

      let userName = "";

      if (data.user) {
        userName = data.user.name!;
      }


      const question: QuestionComment = {
        content: data.content,
        createdAt: data.createdAt,
        id: data.id,
        numVotes: votes,
        user: userName,
      };
      return question;
    });
    }
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

      const questionCommentToUpdate = await ctx.prisma.questionsQuestionComment.findUnique({
        where: {
          id: input.id,
        },
      });

      if (questionCommentToUpdate?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
          // Optional: pass the original error to retain stack trace
        });
      }

      return await ctx.prisma.questionsQuestionComment.update({
        data: {
          ...input,
          userId,
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

      const questionCommentToUpdate = await ctx.prisma.questionsQuestionComment.findUnique({
        where: {
          id: input.id,
        },});

      if (questionCommentToUpdate?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
          // Optional: pass the original error to retain stack trace
        });
      }

      return await ctx.prisma.questionsQuestionComment.delete({
        where: {
          id: input.id,
        },
      });
    },
  });