import { z } from 'zod';
import {QuestionsQuestionType, Vote } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createProtectedRouter } from './context';

import type { Question } from '~/types/questions';

export const questionsQuestionRouter = createProtectedRouter()
  .query('getQuestionsByFilter', {
    input: z.object({
      company: z.string().array().optional(),
      endDate: z.date(),
      location: z.string().array().optional(),
      questionType: z.nativeEnum(QuestionsQuestionType),
      role: z.string().array().optional(),
      startDate: z.date()
    }),
    async resolve({ ctx, input }) {
      const questionsData = await ctx.prisma.questionsQuestion.findMany({
        include: {
        _count: {
          select: {
            answers: true,
            comments: true,
          },
        },
        encounters: {
          select: {
            company: true,
            location: true,
            role: true,
            seenAt: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
        votes: true,
        },
        orderBy: {
        createdAt: 'desc',
        },
        where: {
          questionType: input.questionType,
        },
      });
      return questionsData
        .filter((data) => {
          for (let i = 0; i < data.encounters.length; i++) {
            const encounter = data.encounters[i]
            const matchCompany = (!input.company || (input.company.includes(encounter.company)));
            const matchLocation = (!input.location || (input.location.includes(encounter.location)));
            const matchRole = (!input.role || (input.role.includes(encounter.role)));
            const matchDate = encounter.seenAt >= input.startDate && encounter.seenAt <= input.endDate;
            if (matchCompany && matchLocation && matchRole && matchDate) {return true};
          }
          return false;
        })
        .map((data) => {
          const votes:number = data.votes.reduce(
            (previousValue:number, currentValue) => {
              let result:number = previousValue;

              switch(currentValue.vote) {
              case Vote.UPVOTE:
                result += 1
                break;
              case Vote.DOWNVOTE:
                result -= 1
                break;
              }
              return result;
            },
            0
            );

          let userName = "";

          if (data.user) {
            userName = data.user.name!;
          }

          const question: Question = {
            company: "",
            content: data.content,
            id: data.id,
            location: "",
            numAnswers: data._count.answers,
            numComments: data._count.comments,
            numVotes: votes,
            role: "",
            updatedAt: data.updatedAt,
            user: userName,
          };
          return question;
      });
    }
  })
  .mutation('create', {
    input: z.object({
      company: z.string(),
      content: z.string(),
      location: z.string(),
      questionType: z.nativeEnum(QuestionsQuestionType),
      role: z.string(),
      seenAt: z.date(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      return await ctx.prisma.questionsQuestion.create({
        data: {
          content: input.content,
          encounters: {
            create: [
              {
                company :input.company,
                location: input.location,
                role: input.role,
                seenAt: input.seenAt,
                userId
              }
            ],
          },
          questionType: input.questionType,
          userId
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

      if (questionToUpdate?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
          // Optional: pass the original error to retain stack trace
        });
      }

      return await ctx.prisma.questionsQuestion.update({
        data: {
          ...input,
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

      if (questionToDelete?.id !== userId) {
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
      const {questionId} = input

      return await ctx.prisma.questionsQuestionVote.findUnique({
        where: {
          questionId_userId : {questionId,userId }
        },
      });
    },
  })
  .mutation('createVote', {
    input: z.object({
      questionId: z.string(),
      vote: z.nativeEnum(Vote),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      return await ctx.prisma.questionsQuestionVote.create({
        data: {
          ...input,
          userId,
        },
      });
    },
  })
  .mutation('updateVote', {
    input: z.object({
      id: z.string(),
      vote: z.nativeEnum(Vote),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      const {id, vote} = input

      const voteToUpdate = await ctx.prisma.questionsQuestionVote.findUnique({
        where: {
          id: input.id,
        },
      });

      if (voteToUpdate?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.questionsQuestionVote.update({
        data: {
          vote,
        },
        where: {
          id,
        },
      });
    },
  })
  .mutation('deleteVote', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const voteToDelete = await ctx.prisma.questionsQuestionVote.findUnique({
        where: {
          id: input.id,
        },});

      if (voteToDelete?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.questionsQuestionVote.delete({
        where: {
          id: input.id,
        },
      });
    },
  });