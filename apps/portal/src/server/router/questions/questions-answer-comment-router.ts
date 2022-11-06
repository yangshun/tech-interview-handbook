import { z } from 'zod';
import { Vote } from '@prisma/client';

import { createRouter } from '../context';

import type { AnswerComment } from '~/types/questions';
import { SortOrder, SortType } from '~/types/questions.d';

export const questionsAnswerCommentRouter = createRouter().query(
  'getAnswerComments',
  {
    input: z.object({
      answerId: z.string(),
      cursor: z.string().nullish(),
      limit: z.number().min(1).default(50),
      sortOrder: z.nativeEnum(SortOrder),
      sortType: z.nativeEnum(SortType),
    }),
    async resolve({ ctx, input }) {
      const { answerId, cursor } = input;

      const sortCondition =
        input.sortType === SortType.TOP
          ? [
              {
                upvotes: input.sortOrder,
              },
              {
                id: input.sortOrder,
              },
            ]
          : [
              {
                updatedAt: input.sortOrder,
              },
              {
                id: input.sortOrder,
              },
            ];

      const questionAnswerCommentsData =
        await ctx.prisma.questionsAnswerComment.findMany({
          cursor: cursor ? { id: cursor } : undefined,
          include: {
            user: {
              select: {
                image: true,
                name: true,
              },
            },
            votes: true,
          },
          orderBy: sortCondition,
          take: input.limit + 1,
          where: {
            answerId,
          },
        });
      const processedQuestionAnswerCommentsData =
        questionAnswerCommentsData.map((data) => {
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

      let nextCursor: typeof cursor | undefined = undefined;

      if (questionAnswerCommentsData.length > input.limit) {
        const nextItem = questionAnswerCommentsData.pop()!;
        processedQuestionAnswerCommentsData.pop();

        const nextIdCursor: string | undefined = nextItem.id;

        nextCursor = nextIdCursor;
      }

      return {
        data: processedQuestionAnswerCommentsData,
        nextCursor,
      };
    },
  },
);
