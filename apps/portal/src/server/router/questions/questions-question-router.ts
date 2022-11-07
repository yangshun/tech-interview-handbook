import { z } from 'zod';
import { QuestionsQuestionType } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createQuestionWithAggregateData } from '~/utils/questions/server/aggregate-encounters';

import { createRouter } from '../context';

import { SortOrder, SortType } from '~/types/questions.d';

export const questionsQuestionRouter = createRouter()
  .query('getQuestionsByFilter', {
    input: z.object({
      cityIds: z.string().array(),
      companyIds: z.string().array(),
      content: z.string().optional(),
      countryIds: z.string().array(),
      cursor: z.string().nullish(),
      endDate: z.date().default(new Date()),
      limit: z.number().min(1).default(50),
      questionTypes: z.nativeEnum(QuestionsQuestionType).array(),
      roles: z.string().array(),
      sortOrder: z.nativeEnum(SortOrder),
      sortType: z.nativeEnum(SortType),
      startDate: z.date().optional(),
      stateIds: z.string().array(),
    }),
    async resolve({ ctx, input }) {
      const { cursor } = input;

      let sortCondition = undefined;

      switch (input.sortType) {
        case SortType.TOP:
          sortCondition = [
            {
              upvotes: input.sortOrder,
            },
            {
              id: input.sortOrder,
            },
          ];
          break;
        case SortType.NEW:
          sortCondition = [
            {
              lastSeenAt: input.sortOrder,
            },
            {
              id: input.sortOrder,
            },
          ];
          break;
        case SortType.ENCOUNTERS:
          sortCondition = [
            {
              numEncounters: input.sortOrder,
            },
            {
              id: input.sortOrder,
            },
          ];
          break;
      }

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
              city: true,
              company: true,
              country: true,
              role: true,
              seenAt: true,
              state: true,
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
              ...(input.cityIds.length > 0
                ? {
                    city: {
                      id: {
                        in: input.cityIds,
                      },
                    },
                  }
                : {}),
              ...(input.countryIds.length > 0
                ? {
                    country: {
                      id: {
                        in: input.countryIds,
                      },
                    },
                  }
                : {}),
              ...(input.stateIds.length > 0
                ? {
                    state: {
                      id: {
                        in: input.stateIds,
                      },
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
              city: true,
              company: true,
              country: true,
              role: true,
              seenAt: true,
              state: true,
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
  })
  .query('getRelatedQuestions', {
    input: z.object({
      content: z.string(),
    }),
    async resolve({ ctx, input }) {
      const escapeChars = /[()|&:*!]/g;

      const query = input.content
        .replace(escapeChars, ' ')
        .trim()
        .split(/\s+/)
        .join(' | ');

      const relatedQuestionsId: Array<{ id: string }> = await ctx.prisma
        .$queryRaw`
        SELECT id FROM "QuestionsQuestion"
        WHERE
          ts_rank_cd(to_tsvector("content"), to_tsquery(${query}), 32) > 0.1
        ORDER BY ts_rank_cd(to_tsvector("content"), to_tsquery('english', ${query}), 4) DESC;
      `;

      const relatedQuestionsIdArray = relatedQuestionsId.map(
        (current) => current.id,
      );

      const relatedQuestionsData = await ctx.prisma.questionsQuestion.findMany({
        include: {
          _count: {
            select: {
              answers: true,
              comments: true,
            },
          },
          encounters: {
            select: {
              city: true,
              company: true,
              country: true,
              role: true,
              seenAt: true,
              state: true,
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
          id: {
            in: relatedQuestionsIdArray,
          },
        },
      });

      const processedQuestionsData = relatedQuestionsData.map(
        createQuestionWithAggregateData,
      );

      return processedQuestionsData;
    },
  })
  .query('getQuestionsByFilterAndContent', {
    input: z.object({
      cityIds: z.string().array(),
      companyIds: z.string().array(),
      content: z.string(),
      countryIds: z.string().array(),
      cursor: z.string().nullish(),
      endDate: z.date().default(new Date()),
      limit: z.number().min(1).default(50),
      questionTypes: z.nativeEnum(QuestionsQuestionType).array(),
      roles: z.string().array(),
      sortOrder: z.nativeEnum(SortOrder),
      sortType: z.nativeEnum(SortType),
      startDate: z.date().optional(),
      stateIds: z.string().array(),
    }),
    async resolve({ ctx, input }) {
      const escapeChars = /[()|&:*!]/g;

      const query = input.content
        .replace(escapeChars, ' ')
        .trim()
        .split(/\s+/)
        .join(' | ');

      let relatedQuestionsId: Array<{ id: string }> = [];

      if (input.content !== '') {
        relatedQuestionsId = await ctx.prisma.$queryRaw`
          SELECT id FROM "QuestionsQuestion"
          WHERE
            ts_rank_cd(to_tsvector("content"), to_tsquery(${query}), 32) > 0.1
          ORDER BY ts_rank_cd(to_tsvector("content"), to_tsquery('english', ${query}), 4) DESC;
        `;
      }

      const relatedQuestionsIdArray = relatedQuestionsId.map(
        (current) => current.id,
      );

      const { cursor } = input;

      let sortCondition = undefined;

      switch (input.sortType) {
        case SortType.TOP:
          sortCondition = [
            {
              upvotes: input.sortOrder,
            },
            {
              id: input.sortOrder,
            },
          ];
          break;
        case SortType.NEW:
          sortCondition = [
            {
              lastSeenAt: input.sortOrder,
            },
            {
              id: input.sortOrder,
            },
          ];
          break;
        case SortType.ENCOUNTERS:
          sortCondition = [
            {
              numEncounters: input.sortOrder,
            },
            {
              id: input.sortOrder,
            },
          ];
          break;
      }

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
              city: true,
              company: true,
              country: true,
              role: true,
              seenAt: true,
              state: true,
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
          id:
            input.content !== ''
              ? {
                  in: relatedQuestionsIdArray,
                }
              : undefined,
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
              ...(input.cityIds.length > 0
                ? {
                    city: {
                      id: {
                        in: input.cityIds,
                      },
                    },
                  }
                : {}),
              ...(input.countryIds.length > 0
                ? {
                    country: {
                      id: {
                        in: input.countryIds,
                      },
                    },
                  }
                : {}),
              ...(input.stateIds.length > 0
                ? {
                    state: {
                      id: {
                        in: input.stateIds,
                      },
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
  });
