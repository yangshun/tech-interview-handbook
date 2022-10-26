import { z } from 'zod';
import { QuestionsQuestionType, Vote } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createRouter } from '../context';

import type { Question } from '~/types/questions';
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

      const processedQuestionsData = questionsData.map((data) => {
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

        const companyCounts: Record<string, number> = {};
        const locationCounts: Record<string, number> = {};
        const roleCounts: Record<string, number> = {};

        let latestSeenAt = data.encounters[0].seenAt;

        for (let i = 0; i < data.encounters.length; i++) {
          const encounter = data.encounters[i];

          latestSeenAt =
            latestSeenAt < encounter.seenAt ? encounter.seenAt : latestSeenAt;

          if (!(encounter.company!.name in companyCounts)) {
            companyCounts[encounter.company!.name] = 1;
          }
          companyCounts[encounter.company!.name] += 1;

          if (!(encounter.location in locationCounts)) {
            locationCounts[encounter.location] = 1;
          }
          locationCounts[encounter.location] += 1;

          if (!(encounter.role in roleCounts)) {
            roleCounts[encounter.role] = 1;
          }
          roleCounts[encounter.role] += 1;
        }

        const question: Question = {
          aggregatedQuestionEncounters: {
            companyCounts,
            latestSeenAt,
            locationCounts,
            roleCounts,
          },
          content: data.content,
          id: data.id,
          numAnswers: data._count.answers,
          numComments: data._count.comments,
          numVotes: votes,
          receivedCount: data.encounters.length,
          seenAt: latestSeenAt,
          type: data.questionType,
          updatedAt: data.updatedAt,
          user: data.user?.name ?? '',
        };
        return question;
      });

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
      const votes: number = questionData.votes.reduce(
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

      const companyCounts: Record<string, number> = {};
      const locationCounts: Record<string, number> = {};
      const roleCounts: Record<string, number> = {};

      let latestSeenAt = questionData.encounters[0].seenAt;

      for (const encounter of questionData.encounters) {
        latestSeenAt =
          latestSeenAt < encounter.seenAt ? encounter.seenAt : latestSeenAt;

        if (!(encounter.company!.name in companyCounts)) {
          companyCounts[encounter.company!.name] = 1;
        }
        companyCounts[encounter.company!.name] += 1;

        if (!(encounter.location in locationCounts)) {
          locationCounts[encounter.location] = 1;
        }
        locationCounts[encounter.location] += 1;

        if (!(encounter.role in roleCounts)) {
          roleCounts[encounter.role] = 1;
        }
        roleCounts[encounter.role] += 1;
      }

      const question: Question = {
        aggregatedQuestionEncounters: {
          companyCounts,
          latestSeenAt,
          locationCounts,
          roleCounts,
        },
        content: questionData.content,
        id: questionData.id,
        numAnswers: questionData._count.answers,
        numComments: questionData._count.comments,
        numVotes: votes,
        receivedCount: questionData.encounters.length,
        seenAt: questionData.encounters[0].seenAt,
        type: questionData.questionType,
        updatedAt: questionData.updatedAt,
        user: questionData.user?.name ?? '',
      };
      return question;
    },
  });
