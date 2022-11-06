import { z } from 'zod';
import { Vote } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createRouter } from '../context';

import type { Answer } from '~/types/questions';
import { SortOrder, SortType } from '~/types/questions.d';

export const questionsAnswerRouter = createRouter()
  .query('getAnswers', {
    input: z.object({
      cursor: z.string().nullish(),
      limit: z.number().min(1).default(50),
      questionId: z.string(),
      sortOrder: z.nativeEnum(SortOrder),
      sortType: z.nativeEnum(SortType),
    }),
    async resolve({ ctx, input }) {
      const { questionId, cursor } = input;

      const sortCondition =
        input.sortType === SortType.TOP
          ? [
              {
                upvotes: input.sortOrder,
              },
              {
                id: input.sortOrder,
              },
            ]
          : [
              {
                updatedAt: input.sortOrder,
              },
              {
                id: input.sortOrder,
              },
            ];

      const answersData = await ctx.prisma.questionsAnswer.findMany({
        cursor: cursor ? { id: cursor } : undefined,
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
        orderBy: sortCondition,
        take: input.limit + 1,
        where: {
          questionId,
        },
      });

      const processedAnswersData = answersData.map((data) => {
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

      let nextCursor: typeof cursor | undefined = undefined;

      if (answersData.length > input.limit) {
        const nextItem = answersData.pop()!;
        processedAnswersData.pop();

        const nextIdCursor: string | undefined = nextItem.id;

        nextCursor = nextIdCursor;
      }

      return {
        data: processedAnswersData,
        nextCursor,
      };
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
