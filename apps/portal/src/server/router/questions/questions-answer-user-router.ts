import { z } from 'zod';
import { Vote } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createProtectedRouter } from '../context';

export const questionsAnswerUserRouter = createProtectedRouter()
  .mutation('create', {
    input: z.object({
      content: z.string(),
      questionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const { content, questionId } = input;

      return await ctx.prisma.questionsAnswer.create({
        data: {
          content,
          questionId,
          userId,
        },
      });
    },
  })
  .mutation('update', {
    input: z.object({
      content: z.string().optional(),
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { content, id } = input;

      const answerToUpdate = await ctx.prisma.questionsAnswer.findUnique({
        where: {
          id: input.id,
        },
      });

      if (answerToUpdate?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.questionsAnswer.update({
        data: {
          content,
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

      const answerToDelete = await ctx.prisma.questionsAnswer.findUnique({
        where: {
          id: input.id,
        },
      });

      if (answerToDelete?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.questionsAnswer.delete({
        where: {
          id: input.id,
        },
      });
    },
  })
  .query('getVote', {
    input: z.object({
      answerId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { answerId } = input;

      return await ctx.prisma.questionsAnswerVote.findUnique({
        where: {
          answerId_userId: { answerId, userId },
        },
      });
    },
  })
  .mutation('setUpVote', {
    input: z.object({
      answerId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { answerId } = input;

      return await ctx.prisma.$transaction(async (tx) => {
        const vote = await tx.questionsAnswerVote.findUnique({
          where: {
            answerId_userId: { answerId, userId },
          },
        })

        if (vote === null) {
          const createdVote = await tx.questionsAnswerVote.create({
            data: {
              answerId,
              userId,
              vote: Vote.UPVOTE,
            },
          });

          await tx.questionsAnswer.update({
            data: {
              upvotes: {
                increment: 1,
              },
            },
            where: {
              id: answerId,
            },
          });

          return createdVote
        }

        if (vote!.userId !== userId) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'User have no authorization to record.',
          });
        }

        if (vote!.vote === Vote.UPVOTE) {
          return vote;
        }

        if (vote.vote === Vote.DOWNVOTE) {
          tx.questionsAnswerVote.delete({
            where: {
              id: vote.id,
            },
          });

          const createdVote = await tx.questionsAnswerVote.create({
            data: {
              answerId,
              userId,
              vote: Vote.UPVOTE,
            },
          });

          await tx.questionsAnswer.update({
            data: {
              upvotes: {
                increment: 2,
              },
            },
            where: {
              id: answerId,
            },
          });

          return createdVote
        }
      });
    },
  })
  .mutation('setDownVote', {
    input: z.object({
      answerId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { answerId } = input;

      return await ctx.prisma.$transaction(async (tx) => {
        const vote = await tx.questionsAnswerVote.findUnique({
          where: {
            answerId_userId: { answerId, userId },
          },
        })

        if (vote === null) {
          const createdVote = await tx.questionsAnswerVote.create({
            data: {
              answerId,
              userId,
              vote: Vote.DOWNVOTE,
            },
          });

          await tx.questionsAnswer.update({
            data: {
              upvotes: {
                increment: -1,
              },
            },
            where: {
              id: answerId,
            },
          });

          return createdVote
        }

        if (vote!.userId !== userId) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'User have no authorization to record.',
          });
        }

        if (vote!.vote === Vote.DOWNVOTE) {
          return vote;
        }

        if (vote.vote === Vote.UPVOTE) {
          tx.questionsAnswerVote.delete({
            where: {
              id: vote.id,
            },
          });

          const createdVote = await tx.questionsAnswerVote.create({
            data: {
              answerId,
              userId,
              vote: Vote.DOWNVOTE,
            },
          });

          await tx.questionsAnswer.update({
            data: {
              upvotes: {
                increment: -2,
              },
            },
            where: {
              id: answerId,
            },
          });

          return createdVote
        }
      });
    },
  })
  .mutation('setNoVote', {
    input: z.object({
      answerId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { answerId } = input;

      return await ctx.prisma.$transaction(async (tx) => {
        const voteToDelete = await tx.questionsAnswerVote.findUnique({
          where: {
            answerId_userId: { answerId, userId },
          },
        })

        if (voteToDelete === null) {
          return null;
        }

        if (voteToDelete!.userId !== userId) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'User have no authorization to record.',
          });
        }

        const incrementValue = voteToDelete!.vote === Vote.UPVOTE ? -1 : 1;

        tx.questionsAnswerVote.delete({
          where: {
            id: voteToDelete.id,
          },
        });

        await tx.questionsAnswer.update({
          data: {
            upvotes: {
              increment: incrementValue,
            },
          },
          where: {
            id: answerId,
          },
        });

        return voteToDelete;
      });
    },
  });
