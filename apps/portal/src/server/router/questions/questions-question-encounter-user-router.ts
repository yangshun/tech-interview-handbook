import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { createProtectedRouter } from '../context';

import { SortOrder } from '~/types/questions.d';

export const questionsQuestionEncounterUserRouter = createProtectedRouter()
  .mutation('create', {
    input: z.object({
      cityId: z.string().nullish(),
      companyId: z.string(),
      countryId: z.string(),
      questionId: z.string(),
      role: z.string(),
      seenAt: z.date(),
      stateId: z.string().nullish(),
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


        await tx.questionsQuestion.update({
          data: {
            lastSeenAt: (questionToUpdate.lastSeenAt === null ||
                          questionToUpdate.lastSeenAt < input.seenAt)
                            ? input.seenAt : undefined,
            numEncounters: {
              increment: 1,
            },
          },
          where: {
            id: input.questionId,
          },
        });

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

      if (questionEncounterToUpdate?.userId !== userId) {
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

      if (questionEncounterToDelete?.userId !== userId) {
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

        let lastSeenVal = undefined;

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

          lastSeenVal = latestEncounter ? latestEncounter!.seenAt : null;
        }

        await tx.questionsQuestion.update({
            data: {
              lastSeenAt: lastSeenVal,
              numEncounters: {
                increment: -1,
              },
            },
            where: {
              id: questionToUpdate!.id,
            },
          });

        return questionEncounterDeleted;
      });
    },
  });
