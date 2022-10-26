import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { createProtectedRouter } from './context';

import type { AggregatedQuestionEncounter } from '~/types/questions';
import { SortOrder } from '~/types/questions.d';

export const questionsQuestionEncounterRouter = createProtectedRouter()
  .query('getAggregatedEncounters', {
    input: z.object({
      questionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const questionEncountersData =
        await ctx.prisma.questionsQuestionEncounter.findMany({
          include: {
            company: true,
          },
          where: {
            ...input,
          },
        });

      const companyCounts: Record<string, number> = {};
      const locationCounts: Record<string, number> = {};
      const roleCounts: Record<string, number> = {};

      let latestSeenAt = questionEncountersData[0].seenAt;

      for (let i = 0; i < questionEncountersData.length; i++) {
        const encounter = questionEncountersData[i];

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

      const questionEncounter: AggregatedQuestionEncounter = {
        companyCounts,
        latestSeenAt,
        locationCounts,
        roleCounts,
      };
      return questionEncounter;
    },
  })
  .mutation('create', {
    input: z.object({
      companyId: z.string(),
      location: z.string(),
      questionId: z.string(),
      role: z.string(),
      seenAt: z.date(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      return await ctx.prisma.$transaction(async (tx) => {
        const [questionToUpdate, questionEncounterCreated] = await Promise.all([
          tx.questionsQuestion.findUnique({
            where: {
              id: input.questionId,
            },
          }),
          tx.questionsQuestionEncounter.create({
            data: {
              ...input,
              userId,
            },
          }),
        ]);

        if (questionToUpdate === null) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Question does not exist',
          });
        }

        if (
          !questionToUpdate.lastSeenAt ||
          questionToUpdate.lastSeenAt < input.seenAt
        ) {
          await tx.questionsQuestion.update({
            data: {
              lastSeenAt: input.seenAt,
            },
            where: {
              id: input.questionId,
            },
          });
        }
        return questionEncounterCreated;
      });
    },
  })
  .mutation('update', {
    input: z.object({
      companyId: z.string().optional(),
      id: z.string(),
      location: z.string().optional(),
      role: z.string().optional(),
      seenAt: z.date().optional(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const questionEncounterToUpdate =
        await ctx.prisma.questionsQuestionEncounter.findUnique({
          where: {
            id: input.id,
          },
        });

      if (questionEncounterToUpdate?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.$transaction(async (tx) => {
        const [questionToUpdate, questionEncounterUpdated] = await Promise.all([
          tx.questionsQuestion.findUnique({
            where: {
              id: questionEncounterToUpdate.questionId,
            },
          }),
          tx.questionsQuestionEncounter.update({
            data: {
              ...input,
            },
            where: {
              id: input.id,
            },
          }),
        ]);

        if (questionToUpdate!.lastSeenAt === questionEncounterToUpdate.seenAt) {
          const latestEncounter =
            await ctx.prisma.questionsQuestionEncounter.findFirst({
              orderBy: {
                seenAt: SortOrder.DESC,
              },
              where: {
                questionId: questionToUpdate!.id,
              },
            });

          await tx.questionsQuestion.update({
            data: {
              lastSeenAt: latestEncounter!.seenAt,
            },
            where: {
              id: questionToUpdate!.id,
            },
          });
        }

        return questionEncounterUpdated;
      });
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const questionEncounterToDelete =
        await ctx.prisma.questionsQuestionEncounter.findUnique({
          where: {
            id: input.id,
          },
        });

      if (questionEncounterToDelete?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.$transaction(async (tx) => {
        const [questionToUpdate, questionEncounterDeleted] = await Promise.all([
          tx.questionsQuestion.findUnique({
            where: {
              id: questionEncounterToDelete.questionId,
            },
          }),
          tx.questionsQuestionEncounter.delete({
            where: {
              id: input.id,
            },
          }),
        ]);

        if (questionToUpdate!.lastSeenAt === questionEncounterToDelete.seenAt) {
          const latestEncounter =
            await ctx.prisma.questionsQuestionEncounter.findFirst({
              orderBy: {
                seenAt: SortOrder.DESC,
              },
              where: {
                questionId: questionToUpdate!.id,
              },
            });

          const lastSeenVal = latestEncounter ? latestEncounter!.seenAt : null;

          await tx.questionsQuestion.update({
            data: {
              lastSeenAt: lastSeenVal,
            },
            where: {
              id: questionToUpdate!.id,
            },
          });
        }

        return questionEncounterDeleted;
      });
    },
  });
