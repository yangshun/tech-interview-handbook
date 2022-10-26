import { z } from 'zod';
import { Vote } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createRouter } from '../context';

import type { Answer } from '~/types/questions';

export const questionsAnswerRouter = createRouter()
  .query('getAnswers', {
    input: z.object({
      questionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { questionId } = input;

      const answersData = await ctx.prisma.questionsAnswer.findMany({
        include: {
          _count: {
            select: {
              comments: true,
            },
          },
          user: {
            select: {
              image: true,
              name: true,
            },
          },
          votes: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          questionId,
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
          userImage: data.user?.image ?? '',
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
              image: true,
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
        userImage: answerData.user?.image ?? '',
      };
      return answer;
    },
  });
