import { z } from 'zod';
import {QuestionsQuestionType, QuestionsVote } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createProtectedRouter } from './context';

import type { Question } from '~/types/questions-question';

export const questionsQuestionsRouter = createProtectedRouter()
  .query('getQuestionsByFilter', {
    input: z.object({
      content: z.string(),
      questionType: z.nativeEnum(QuestionsQuestionType),
    }),
    async resolve({ ctx, input }) {
      const questionsData = await ctx.prisma.questionsQuestion.findMany({
      include: {
        _count: {
          select: {
            answers: true,
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
    });
    return questionsData.map((data) => {
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


      const question: Question = {
        company: "",
        content: data.content,
        id: data.id,
        location: "",
        numAnswers: data._count.answers,
        numComments: data._count.comments,
        numVotes: votes,
        role: "",
        updatedAt: data.updatedAt,
        user: userName,
      };
      return question;
    });
    }
  })
  .mutation('create', {
    input: z.object({
      content: z.string(),
      questionType: z.nativeEnum(QuestionsQuestionType),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      return await ctx.prisma.questionsQuestion.create({
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
      questionType: z.nativeEnum(QuestionsQuestionType).optional(),

    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const questionToUpdate = await ctx.prisma.questionsQuestion.findUnique({
        where: {
          id: input.id,
        },});

        if (questionToUpdate?.id !== userId) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'User have no authorization to record.',
            // Optional: pass the original error to retain stack trace
        });
        }
      // TODO: Check if session user owns this Question.
      return await ctx.prisma.questionsQuestion.update({
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
      // TODO: Check if session user owns this Todo.
      return await ctx.prisma.questionsQuestion.delete({
        where: {
          id: input.id,
        },
      });
    },
  });