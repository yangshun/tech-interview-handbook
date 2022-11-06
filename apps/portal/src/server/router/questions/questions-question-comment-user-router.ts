import { z } from 'zod';
import { Vote } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createProtectedRouter } from '../context';

export const questionsQuestionCommentUserRouter = createProtectedRouter()
  .mutation('create', {
    input: z.object({
      content: z.string(),
      questionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const { content, questionId } = input;

      return await ctx.prisma.questionsQuestionComment.create({
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

      const { content } = input;

      const questionCommentToUpdate =
        await ctx.prisma.questionsQuestionComment.findUnique({
          where: {
            id: input.id,
          },
        });

      if (questionCommentToUpdate?.userId !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.questionsQuestionComment.update({
        data: {
          content,
        },
        where: {
          id: input.id,
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

      const questionCommentToDelete =
        await ctx.prisma.questionsQuestionComment.findUnique({
          where: {
            id: input.id,
          },
        });

      if (questionCommentToDelete?.userId !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.questionsQuestionComment.delete({
        where: {
          id: input.id,
        },
      });
    },
  })
  .query('getVote', {
    input: z.object({
      questionCommentId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { questionCommentId } = input;

      return await ctx.prisma.questionsQuestionCommentVote.findUnique({
        where: {
          questionCommentId_userId: { questionCommentId, userId },
        },
      });
    },
  })
  .mutation('setUpVote', {
    input: z.object({
      questionCommentId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { questionCommentId } = input;

      return await ctx.prisma.$transaction(async (tx) => {
        const questionCommentToUpdate =
          await tx.questionsQuestionComment.findUnique({
            where: {
              id: questionCommentId,
            },
          });

        if (questionCommentToUpdate === null) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Question Comment do not exist.',
          });
        }

        const vote = await tx.questionsQuestionCommentVote.findUnique({
          where: {
            questionCommentId_userId: { questionCommentId, userId },
          },
        });

        if (vote === null) {
          const createdVote = await tx.questionsQuestionCommentVote.create({
            data: {
              questionCommentId,
              userId,
              vote: Vote.UPVOTE,
            },
          });

          await tx.questionsQuestionComment.update({
            data: {
              upvotes: {
                increment: 1,
              },
            },
            where: {
              id: questionCommentId,
            },
          });

          return createdVote;
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
          const updatedVote = await tx.questionsQuestionCommentVote.update({
            data: {
              questionCommentId,
              userId,
              vote: Vote.UPVOTE,
            },
            where: {
              id: vote.id,
            },
          });

          await tx.questionsQuestionComment.update({
            data: {
              upvotes: {
                increment: 2,
              },
            },
            where: {
              id: questionCommentId,
            },
          });

          return updatedVote;
        }
      });
    },
  })
  .mutation('setDownVote', {
    input: z.object({
      questionCommentId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { questionCommentId } = input;

      return await ctx.prisma.$transaction(async (tx) => {
        const questionCommentToUpdate =
          await tx.questionsQuestionComment.findUnique({
            where: {
              id: questionCommentId,
            },
          });

        if (questionCommentToUpdate === null) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Question Comment do not exist.',
          });
        }

        const vote = await tx.questionsQuestionCommentVote.findUnique({
          where: {
            questionCommentId_userId: { questionCommentId, userId },
          },
        });

        if (vote === null) {
          const createdVote = await tx.questionsQuestionCommentVote.create({
            data: {
              questionCommentId,
              userId,
              vote: Vote.DOWNVOTE,
            },
          });

          await tx.questionsQuestionComment.update({
            data: {
              upvotes: {
                increment: -1,
              },
            },
            where: {
              id: questionCommentId,
            },
          });

          return createdVote;
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
          const updatedVote = await tx.questionsQuestionCommentVote.update({
            data: {
              questionCommentId,
              userId,
              vote: Vote.DOWNVOTE,
            },
            where: {
              id: vote.id,
            },
          });

          await tx.questionsQuestionComment.update({
            data: {
              upvotes: {
                increment: -2,
              },
            },
            where: {
              id: questionCommentId,
            },
          });

          return updatedVote;
        }
      });
    },
  })
  .mutation('setNoVote', {
    input: z.object({
      questionCommentId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { questionCommentId } = input;

      return await ctx.prisma.$transaction(async (tx) => {
        const questionCommentToUpdate =
          await tx.questionsQuestionComment.findUnique({
            where: {
              id: questionCommentId,
            },
          });

        if (questionCommentToUpdate === null) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Question Comment do not exist.',
          });
        }

        const voteToDelete = await tx.questionsQuestionCommentVote.findUnique({
          where: {
            questionCommentId_userId: { questionCommentId, userId },
          },
        });

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

        await tx.questionsQuestionCommentVote.delete({
          where: {
            id: voteToDelete.id,
          },
        });

        await tx.questionsQuestionComment.update({
          data: {
            upvotes: {
              increment: incrementValue,
            },
          },
          where: {
            id: questionCommentId,
          },
        });

        return voteToDelete;
      });
    },
  });
