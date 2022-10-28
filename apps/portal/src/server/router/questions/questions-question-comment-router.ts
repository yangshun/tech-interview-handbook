import { z } from 'zod';
import { Vote } from '@prisma/client';

import { createRouter } from '../context';

import type { QuestionComment } from '~/types/questions';

export const questionsQuestionCommentRouter = createRouter().query(
  'getQuestionComments',
  {
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
  },
);
