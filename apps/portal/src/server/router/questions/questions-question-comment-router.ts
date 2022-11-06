import { z } from 'zod';
import { Vote } from '@prisma/client';

import { createRouter } from '../context';

import type { QuestionComment } from '~/types/questions';
import { SortOrder, SortType } from '~/types/questions.d';

export const questionsQuestionCommentRouter = createRouter().query(
  'getQuestionComments',
  {
    input: z.object({
      cursor: z.string().nullish(),
      limit: z.number().min(1).default(50),
      questionId: z.string(),
      sortOrder: z.nativeEnum(SortOrder),
      sortType: z.nativeEnum(SortType),
    }),
    async resolve({ ctx, input }) {
      const { questionId, cursor } = input;

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

      const questionCommentsData =
        await ctx.prisma.questionsQuestionComment.findMany({
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
            questionId,
          },
        });
      const processedQuestionCommentsData = questionCommentsData.map((data) => {
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

      let nextCursor: typeof cursor | undefined = undefined;

      if (questionCommentsData.length > input.limit) {
        const nextItem = questionCommentsData.pop()!;
        processedQuestionCommentsData.pop();

        const nextIdCursor: string | undefined = nextItem.id;

        nextCursor = nextIdCursor;
      }

      return {
        data: processedQuestionCommentsData,
        nextCursor,
      };
    },
  },
);
