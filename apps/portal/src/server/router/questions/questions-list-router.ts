import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { createQuestionWithAggregateData } from '~/utils/questions/server/aggregate-encounters';

import { createProtectedRouter } from '../context';

export const questionsListRouter = createProtectedRouter()
  .query('getListsByUser', {
    async resolve({ ctx }) {
      const userId = ctx.session?.user?.id;

      // TODO: Optimize by not returning question entries
      const questionsLists = await ctx.prisma.questionsList.findMany({
        include: {
          questionEntries: {
            include: {
              question: {
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
              },
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
        where: {
          userId,
        },
      });

      const lists = questionsLists.map((list) => ({
        ...list,
        questionEntries: list.questionEntries.map((entry) => ({
          ...entry,
          question: createQuestionWithAggregateData(entry.question),
        })),
      }));

      return lists;
    },
  })
  .query('getListById', {
    input: z.object({
      listId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { listId } = input;

      const questionList = await ctx.prisma.questionsList.findFirst({
        include: {
          questionEntries: {
            include: {
              question: {
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
              },
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
        where: {
          id: listId,
          userId,
        },
      });

      if (!questionList) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Question list not found',
        });
      }

      return {
        ...questionList,
        questionEntries: questionList.questionEntries.map((questionEntry) => ({
          ...questionEntry,
          question: createQuestionWithAggregateData(questionEntry.question),
        })),
      };
    },
  })
  .mutation('create', {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const { name } = input;

      return await ctx.prisma.questionsList.create({
        data: {
          name,
          userId,
        },
      });
    },
  })
  .mutation('update', {
    input: z.object({
      id: z.string(),
      name: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { name, id } = input;

      const listToUpdate = await ctx.prisma.questionsList.findUnique({
        where: {
          id: input.id,
        },
      });

      if (listToUpdate?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.questionsList.update({
        data: {
          name,
        },
        where: {
          id,
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

      const listToDelete = await ctx.prisma.questionsList.findUnique({
        where: {
          id: input.id,
        },
      });

      if (listToDelete?.userId !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.questionsList.delete({
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation('createQuestionEntry', {
    input: z.object({
      listId: z.string(),
      questionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const listToAugment = await ctx.prisma.questionsList.findUnique({
        where: {
          id: input.listId,
        },
      });

      if (listToAugment?.userId !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      const { questionId, listId } = input;

      return await ctx.prisma.questionsListQuestionEntry.create({
        data: {
          listId,
          questionId,
        },
      });
    },
  })
  .mutation('deleteQuestionEntry', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const entryToDelete =
        await ctx.prisma.questionsListQuestionEntry.findUnique({
          where: {
            id: input.id,
          },
        });

      if (entryToDelete === null) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Entry not found.',
        });
      }

      const listToAugment = await ctx.prisma.questionsList.findUnique({
        where: {
          id: entryToDelete.listId,
        },
      });

      if (listToAugment?.userId !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.questionsListQuestionEntry.delete({
        where: {
          id: input.id,
        },
      });
    },
  });
