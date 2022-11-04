import { z } from 'zod';

import { createProtectedRouter } from '../context';

export const questionsTagUserRouter = createProtectedRouter()
  .mutation('create', {
    input: z.object({
      tag: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.questionTag.upsert({
        where: {
            tag : input.tag,
        },
        update: {},
        create : {
            tag : input.tag,
        }
      });
    },
  })
  .mutation('addTagToQuestion', {
    input: z.object({
        questionId: z.string(),
        tagId: z.string(),
    }),
    async resolve({ ctx, input }) {
        return await ctx.prisma.questionQuestionTagEntry.create({
            data: {
              question:{
                connect: {
                  id: input.questionId,
                },
              },
              tag:{
                connect: {
                  id: input.tagId,
                },
              },
            },
        });
    },
  })
  .mutation('removeTagFromQuestion', {
    input: z.object({
        id: z.string(),
    }),
    async resolve({ ctx, input }) {
        return await ctx.prisma.questionQuestionTagEntry.delete({
            where: {
                id: input.id,
            },
        });
    }
 })
 .mutation('combineTags', {
    input: z.object({
        tagToCombineId: z.string(),
        tagToCombineToId: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.$transaction(async (tx) => {
        const questionTagsUpdated = await tx.questionQuestionTagEntry.updateMany({
          where: {
            tagId: input.tagToCombineId,
          },
          data: {
            tagId: input.tagToCombineId,
          },
        });

        tx.questionTag.delete({
          where: {
            id: input.tagToCombineId,
          },
        });

        return questionTagsUpdated;
      });
    }
 });
