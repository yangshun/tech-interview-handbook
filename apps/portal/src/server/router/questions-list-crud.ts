import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { createProtectedRouter } from './context';

export const questionListRouter = createProtectedRouter()
  .query('getListsByUser', {
    async resolve({ ctx }) {
      const userId = ctx.session?.user?.id;

      return await ctx.prisma.questionsList.findMany({
        include: {
          questionEntries: {
            include: {
              question: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
        where: {
          id: userId,
        },
      });
    },
  })
  .query('getListById', {
    input: z.object({
      listId: z.string(),
    }),
    async resolve({ ctx }) {
      const userId = ctx.session?.user?.id;

      return await ctx.prisma.questionsList.findMany({
        include: {
          questionEntries: {
            include: {
              question: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
        where: {
          id: userId,
        },
      });
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

      if (listToDelete?.id !== userId) {
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

      if (listToAugment?.id !== userId) {
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

      if (entryToDelete?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      const listToAugment = await ctx.prisma.questionsList.findUnique({
        where: {
          id: entryToDelete.listId,
        },
      });

      if (listToAugment?.id !== userId) {
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
