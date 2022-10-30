import { z } from 'zod';
import { Vote } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createProtectedRouter } from '../context';

export const questionsAnswerCommentUserRouter = createProtectedRouter()
  .mutation('create', {
    input: z.object({
      answerId: z.string(),
      content: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const { answerId, content } = input;

      return await ctx.prisma.questionsAnswerComment.create({
        data: {
          answerId,
          content,
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

      const answerCommentToUpdate =
        await ctx.prisma.questionsAnswerComment.findUnique({
          where: {
            id: input.id,
          },
        });

      if (answerCommentToUpdate?.userId !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      const { content } = input;
      return await ctx.prisma.questionsAnswerComment.update({
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

      const answerCommentToDelete =
        await ctx.prisma.questionsAnswerComment.findUnique({
          where: {
            id: input.id,
          },
        });

      if (answerCommentToDelete?.userId !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.questionsAnswerComment.delete({
        where: {
          id: input.id,
        },
      });
    },
  })
  .query('getVote', {
    input: z.object({
      answerCommentId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { answerCommentId } = input;

      return await ctx.prisma.questionsAnswerCommentVote.findUnique({
        where: {
          answerCommentId_userId: { answerCommentId, userId },
        },
      });
    },
  })
  .mutation('setUpVote', {
    input: z.object({
      answerCommentId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { answerCommentId } = input;

      return await ctx.prisma.$transaction(async (tx) => {
        const answerCommentToUpdate =
          await tx.questionsAnswerComment.findUnique({
            where: {
              id: answerCommentId,
            },
          });

        if (answerCommentToUpdate === null) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Answer Comment do not exist.',
          });
        }

        const vote = await tx.questionsAnswerCommentVote.findUnique({
          where: {
            answerCommentId_userId: { answerCommentId, userId },
          },
        });

        if (vote === null) {
          const createdVote = await tx.questionsAnswerCommentVote.create({
            data: {
              answerCommentId,
              userId,
              vote: Vote.UPVOTE,
            },
          });

          await tx.questionsAnswerComment.update({
            data: {
              upvotes: {
                increment: 1,
              },
            },
            where: {
              id: answerCommentId,
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
          const updatedVote = await tx.questionsAnswerCommentVote.update({
            data: {
              answerCommentId,
              userId,
              vote: Vote.UPVOTE,
            },
            where: {
              id: vote.id,
            },
          });

          await tx.questionsAnswerComment.update({
            data: {
              upvotes: {
                increment: 2,
              },
            },
            where: {
              id: answerCommentId,
            },
          });

          return updatedVote;
        }
      });
    },
  })
  .mutation('setDownVote', {
    input: z.object({
      answerCommentId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { answerCommentId } = input;

      return await ctx.prisma.$transaction(async (tx) => {
        const answerCommentToUpdate =
          await tx.questionsAnswerComment.findUnique({
            where: {
              id: answerCommentId,
            },
          });

        if (answerCommentToUpdate === null) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Answer Comment do not exist.',
          });
        }

        const vote = await tx.questionsAnswerCommentVote.findUnique({
          where: {
            answerCommentId_userId: { answerCommentId, userId },
          },
        });

        if (vote === null) {
          const createdVote = await tx.questionsAnswerCommentVote.create({
            data: {
              answerCommentId,
              userId,
              vote: Vote.DOWNVOTE,
            },
          });

          await tx.questionsAnswerComment.update({
            data: {
              upvotes: {
                increment: -1,
              },
            },
            where: {
              id: answerCommentId,
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
          const updatedVote = await tx.questionsAnswerCommentVote.update({
            data: {
              answerCommentId,
              userId,
              vote: Vote.DOWNVOTE,
            },
            where: {
              id: vote.id,
            },
          });

          await tx.questionsAnswerComment.update({
            data: {
              upvotes: {
                increment: -2,
              },
            },
            where: {
              id: answerCommentId,
            },
          });

          return updatedVote;
        }
      });
    },
  })
  .mutation('setNoVote', {
    input: z.object({
      answerCommentId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { answerCommentId } = input;

      return await ctx.prisma.$transaction(async (tx) => {
        const answerCommentToUpdate =
          await tx.questionsAnswerComment.findUnique({
            where: {
              id: answerCommentId,
            },
          });

        if (answerCommentToUpdate === null) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Answer Comment do not exist.',
          });
        }

        const voteToDelete = await tx.questionsAnswerCommentVote.findUnique({
          where: {
            answerCommentId_userId: { answerCommentId, userId },
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

        await tx.questionsAnswerCommentVote.delete({
          where: {
            id: voteToDelete.id,
          },
        });

        await tx.questionsAnswerComment.update({
          data: {
            upvotes: {
              increment: incrementValue,
            },
          },
          where: {
            id: answerCommentId,
          },
        });

        return voteToDelete;
      });
    },
  });
