import { z } from 'zod';
import { QuestionsQuestionType } from '@prisma/client';
import { JobTitleLabels } from '~/components/shared/JobTitles';
import { TRPCError } from '@trpc/server';

import { createQuestionWithAggregateData } from '~/utils/questions/server/aggregate-encounters';

import { createRouter } from '../context';

import { SortOrder, SortType } from '~/types/questions.d';

export const questionsQuestionRouter = createRouter()
  .query('getQuestionsByFilter', {
    input: z.object({
      companyIds: z.string().array(),
      cursor: z.string().nullish(),
      endDate: z.date().default(new Date()),
      limit: z.number().min(1).default(50),
      countryIds: z.string().array(),
      cityIds: z.string().array(),
      stateIds: z.string().array(),
      locations: z.string().array(),
      questionTypes: z.nativeEnum(QuestionsQuestionType).array(),
      roles: z.nativeEnum(JobTitleLabels).array(),
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
        cursor: cursor ? { id: cursor } : undefined,
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
              country: true,
              city: true,
              state: true,
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
              ...(input.companyIds.length > 0
                ? {
                    company: {
                      id: {
                        in: input.companyIds,
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

        nextCursor = nextIdCursor;
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
              country: true,
              city: true,
              state: true,
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
