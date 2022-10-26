import { z } from 'zod';
import { Vote } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createProtectedRouter } from './context';

import type { QuestionComment } from '~/types/questions';

export const questionsQuestionCommentRouter = createProtectedRouter()
  .query('getQuestionComments', {
    input: z.object({
      questionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { questionId } = input;
      const questionCommentsData =
        await ctx.prisma.questionsQuestionComment.findMany({
          include: {
            user: {
              select: {
                image: true,
                name: true,
              },
            },
            votes: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          where: {
            questionId,
          },
        });
      return questionCommentsData.map((data) => {
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

        const questionComment: QuestionComment = {
          content: data.content,
          createdAt: data.createdAt,
          id: data.id,
          numVotes: votes,
          user: data.user?.name ?? '',
          userImage: data.user?.image ?? '',
        };
        return questionComment;
      });
    },
  })
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

      if (questionCommentToUpdate?.id !== userId) {
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

      if (questionCommentToDelete?.id !== userId) {
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
  .mutation('createVote', {
    input: z.object({
      questionCommentId: z.string(),
      vote: z.nativeEnum(Vote),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { questionCommentId, vote } = input;

      const incrementValue: number = vote === Vote.UPVOTE ? 1 : -1;

      const [questionCommentVote] = await ctx.prisma.$transaction([
        ctx.prisma.questionsQuestionCommentVote.create({
          data: {
            questionCommentId,
            userId,
            vote,
          },
        }),
        ctx.prisma.questionsQuestionComment.update({
          data: {
            upvotes: {
              increment: incrementValue,
            },
          },
          where: {
            id: questionCommentId,
          },
        }),
      ]);
      return questionCommentVote;
    },
  })
  .mutation('updateVote', {
    input: z.object({
      id: z.string(),
      vote: z.nativeEnum(Vote),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { id, vote } = input;

      const voteToUpdate =
        await ctx.prisma.questionsQuestionCommentVote.findUnique({
          where: {
            id: input.id,
          },
        });

      if (voteToUpdate?.userId !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      const incrementValue = vote === Vote.UPVOTE ? 2 : -2;

      const [questionCommentVote] = await ctx.prisma.$transaction([
        ctx.prisma.questionsQuestionCommentVote.update({
          data: {
            vote,
          },
          where: {
            id,
          },
        }),
        ctx.prisma.questionsQuestionComment.update({
          data: {
            upvotes: {
              increment: incrementValue,
            },
          },
          where: {
            id: voteToUpdate.questionCommentId,
          },
        }),
      ]);

      return questionCommentVote;
    },
  })
  .mutation('deleteVote', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const voteToDelete =
        await ctx.prisma.questionsQuestionCommentVote.findUnique({
          where: {
            id: input.id,
          },
        });

      if (voteToDelete?.userId !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      const incrementValue = voteToDelete.vote === Vote.UPVOTE ? -1 : 1;

      const [questionCommentVote] = await ctx.prisma.$transaction([
        ctx.prisma.questionsQuestionCommentVote.delete({
          where: {
            id: input.id,
          },
        }),
        ctx.prisma.questionsQuestionComment.update({
          data: {
            upvotes: {
              increment: incrementValue,
            },
          },
          where: {
            id: voteToDelete.questionCommentId,
          },
        }),
      ]);
      return questionCommentVote;
    },
  });
