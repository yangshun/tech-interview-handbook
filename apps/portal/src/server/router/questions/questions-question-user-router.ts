import { z } from 'zod';
import { QuestionsQuestionType, Vote } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createProtectedRouter } from '../context';

export const questionsQuestionUserRouter = createProtectedRouter()
  .mutation('create', {
    input: z.object({
      cityId: z.string().nullish(),
      companyId: z.string(),
      content: z.string(),
      countryId: z.string(),
      questionType: z.nativeEnum(QuestionsQuestionType),
      role: z.string(),
      seenAt: z.date(),
      stateId: z.string().nullish(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      return await ctx.prisma.questionsQuestion.create({
        data: {
          content: input.content,
          encounters: {
            create: {
              city:
                input.cityId !== null
                  ? {
                      connect: {
                        id: input.cityId,
                      },
                    }
                  : undefined,
              company: {
                connect: {
                  id: input.companyId,
                },
              },
              country: {
                connect: {
                  id: input.countryId,
                },
              },
              role: input.role,
              seenAt: input.seenAt,
              state:
                input.stateId !== null
                  ? {
                      connect: {
                        id: input.stateId,
                      },
                    }
                  : undefined,
              user: {
                connect: {
                  id: userId,
                },
              },
            },
          },
          lastSeenAt: input.seenAt,
          questionType: input.questionType,
          userId,
        },
      });
    },
  })
  .mutation('update', {
    input: z.object({
      content: z.string().optional(),
      id: z.string(),
      questionType: z.nativeEnum(QuestionsQuestionType).optional(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const questionToUpdate = await ctx.prisma.questionsQuestion.findUnique({
        where: {
          id: input.id,
        },
      });

      if (questionToUpdate?.userId !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
          // Optional: pass the original error to retain stack trace
        });
      }

      const { content, questionType } = input;

      return await ctx.prisma.questionsQuestion.update({
        data: {
          content,
          questionType,
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

      const questionToDelete = await ctx.prisma.questionsQuestion.findUnique({
        where: {
          id: input.id,
        },
      });

      if (questionToDelete?.userId !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
          // Optional: pass the original error to retain stack trace
        });
      }

      return await ctx.prisma.questionsQuestion.delete({
        where: {
          id: input.id,
        },
      });
    },
  })
  .query('getVote', {
    input: z.object({
      questionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { questionId } = input;

      return await ctx.prisma.questionsQuestionVote.findUnique({
        where: {
          questionId_userId: { questionId, userId },
        },
      });
    },
  })
  .mutation('setUpVote', {
    input: z.object({
      questionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { questionId } = input;

      return await ctx.prisma.$transaction(async (tx) => {
        const questionToUpdate = await tx.questionsQuestion.findUnique({
          where: {
            id: questionId,
          },
        });

        if (questionToUpdate === null) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Question do not exist.',
          });
        }

        const vote = await tx.questionsQuestionVote.findUnique({
          where: {
            questionId_userId: { questionId, userId },
          },
        });

        if (vote === null) {
          const createdVote = await tx.questionsQuestionVote.create({
            data: {
              questionId,
              userId,
              vote: Vote.UPVOTE,
            },
          });

          await tx.questionsQuestion.update({
            data: {
              upvotes: {
                increment: 1,
              },
            },
            where: {
              id: questionId,
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
          const updatedVote = await tx.questionsQuestionVote.update({
            data: {
              questionId,
              userId,
              vote: Vote.UPVOTE,
            },
            where: {
              id: vote.id,
            },
          });

          await tx.questionsQuestion.update({
            data: {
              upvotes: {
                increment: 2,
              },
            },
            where: {
              id: questionId,
            },
          });

          return updatedVote;
        }
      });
    },
  })
  .mutation('setDownVote', {
    input: z.object({
      questionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { questionId } = input;

      return await ctx.prisma.$transaction(async (tx) => {
        const questionToUpdate = await tx.questionsQuestion.findUnique({
          where: {
            id: questionId,
          },
        });

        if (questionToUpdate === null) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Question do not exist.',
          });
        }

        const vote = await tx.questionsQuestionVote.findUnique({
          where: {
            questionId_userId: { questionId, userId },
          },
        });

        if (vote === null) {
          const createdVote = await tx.questionsQuestionVote.create({
            data: {
              questionId,
              userId,
              vote: Vote.DOWNVOTE,
            },
          });

          await tx.questionsQuestion.update({
            data: {
              upvotes: {
                increment: -1,
              },
            },
            where: {
              id: questionId,
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

        if (vote.vote === Vote.DOWNVOTE) {
          return vote;
        }

        if (vote.vote === Vote.UPVOTE) {
          const updatedVote = await tx.questionsQuestionVote.update({
            data: {
              questionId,
              userId,
              vote: Vote.DOWNVOTE,
            },
            where: {
              id: vote.id,
            },
          });

          await tx.questionsQuestion.update({
            data: {
              upvotes: {
                increment: -2,
              },
            },
            where: {
              id: questionId,
            },
          });

          return updatedVote;
        }
      });
    },
  })
  .mutation('setNoVote', {
    input: z.object({
      questionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const { questionId } = input;

      return await ctx.prisma.$transaction(async (tx) => {
        const questionToUpdate = await tx.questionsQuestion.findUnique({
          where: {
            id: questionId,
          },
        });

        if (questionToUpdate === null) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Question do not exist.',
          });
        }

        const voteToDelete = await tx.questionsQuestionVote.findUnique({
          where: {
            questionId_userId: { questionId, userId },
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

        await tx.questionsQuestionVote.delete({
          where: {
            id: voteToDelete.id,
          },
        });

        await tx.questionsQuestion.update({
          data: {
            upvotes: {
              increment: incrementValue,
            },
          },
          where: {
            id: questionId,
          },
        });

        return voteToDelete;
      });
    },
  });
