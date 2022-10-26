import { z } from 'zod';
import { QuestionsQuestionType } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createQuestionWithAggregateData } from '~/utils/questions/server/aggregate-encounters';

import { createRouter } from '../context';

import { SortOrder, SortType } from '~/types/questions.d';

export const questionsQuestionRouter = createRouter()
  .query('getQuestionsByFilter', {
    input: z.object({
      companyNames: z.string().array(),
      cursor: z
        .object({
          idCursor: z.string().optional(),
          lastSeenCursor: z.date().nullish().optional(),
          upvoteCursor: z.number().optional(),
        })
        .nullish(),
      endDate: z.date().default(new Date()),
      limit: z.number().min(1).default(50),
      locations: z.string().array(),
      questionTypes: z.nativeEnum(QuestionsQuestionType).array(),
      roles: z.string().array(),
      sortOrder: z.nativeEnum(SortOrder),
      sortType: z.nativeEnum(SortType),
      startDate: z.date().optional(),
    }),
    async resolve({ ctx, input }) {
      const { cursor } = input;

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
                lastSeenAt: input.sortOrder,
              },
              {
                id: input.sortOrder,
              },
            ];

      const questionsData = await ctx.prisma.questionsQuestion.findMany({
        cursor:
          cursor !== undefined
            ? {
                id: cursor ? cursor!.idCursor : undefined,
              }
            : undefined,
        include: {
          _count: {
            select: {
              answers: true,
              comments: true,
            },
          },
          encounters: {
            select: {
              company: true,
              location: true,
              role: true,
              seenAt: true,
            },
          },
          user: {
            select: {
              name: true,
            },
          },
          votes: true,
        },
        orderBy: sortCondition,
        take: input.limit + 1,
        where: {
          ...(input.questionTypes.length > 0
            ? {
                questionType: {
                  in: input.questionTypes,
                },
              }
            : {}),
          encounters: {
            some: {
              seenAt: {
                gte: input.startDate,
                lte: input.endDate,
              },
              ...(input.companyNames.length > 0
                ? {
                    company: {
                      name: {
                        in: input.companyNames,
                      },
                    },
                  }
                : {}),
              ...(input.locations.length > 0
                ? {
                    location: {
                      in: input.locations,
                    },
                  }
                : {}),
              ...(input.roles.length > 0
                ? {
                    role: {
                      in: input.roles,
                    },
                  }
                : {}),
            },
          },
        },
      });

      const processedQuestionsData = questionsData.map(
        createQuestionWithAggregateData,
      );

      let nextCursor: typeof cursor | undefined = undefined;

      if (questionsData.length > input.limit) {
        const nextItem = questionsData.pop()!;
        processedQuestionsData.pop();

        const nextIdCursor: string | undefined = nextItem.id;
        const nextLastSeenCursor =
          input.sortType === SortType.NEW ? nextItem.lastSeenAt : undefined;
        const nextUpvoteCursor =
          input.sortType === SortType.TOP ? nextItem.upvotes : undefined;

        nextCursor = {
          idCursor: nextIdCursor,
          lastSeenCursor: nextLastSeenCursor,
          upvoteCursor: nextUpvoteCursor,
        };
      }

      return {
        data: processedQuestionsData,
        nextCursor,
      };
    },
  })
  .query('getQuestionById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const questionData = await ctx.prisma.questionsQuestion.findUnique({
        include: {
          _count: {
            select: {
              answers: true,
              comments: true,
            },
          },
          encounters: {
            select: {
              company: true,
              location: true,
              role: true,
              seenAt: true,
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
          id: input.id,
        },
      });
      if (!questionData) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Question not found',
        });
      }

      return createQuestionWithAggregateData(questionData);
    },
  });
