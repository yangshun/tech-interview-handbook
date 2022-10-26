import { z } from 'zod';
import { Vote } from '@prisma/client';

import { createRouter } from '../context';

import type { AnswerComment } from '~/types/questions';

export const questionsAnswerCommentRouter = createRouter().query(
  'getAnswerComments',
  {
    input: z.object({
      answerId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const questionAnswerCommentsData =
        await ctx.prisma.questionsAnswerComment.findMany({
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
            answerId: input.answerId,
          },
        });
      return questionAnswerCommentsData.map((data) => {
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

        const answerComment: AnswerComment = {
          content: data.content,
          createdAt: data.createdAt,
          id: data.id,
          numVotes: votes,
          updatedAt: data.updatedAt,
          user: data.user?.name ?? '',
          userImage: data.user?.image ?? '',
        };
        return answerComment;
      });
    },
  },
);
