import type { InfiniteData } from 'react-query';

import { trpc } from '~/utils/trpc';

import useVote from './useVote';

import type { AnswerComment } from '~/types/questions';

export default function useAnswerCommentVote(id: string) {
  const utils = trpc.useContext();

  return useVote(id, {
    idKey: 'answerCommentId',
    invalidateKeys: [],
    onMutate: async (voteValueChange) => {
      // Update answer comment list
      const answerCommentQueries = utils.queryClient.getQueriesData([
        'questions.answers.comments.getAnswerComments',
      ]);

      const revertFunctions: Array<() => void> = [];

      if (answerCommentQueries !== undefined) {
        for (const [key, query] of answerCommentQueries) {
          if (query === undefined) {
            continue;
          }

          const { pages, ...restQuery } = query as InfiniteData<{
            data: Array<AnswerComment>;
          }>;

          const newQuery = {
            pages: pages.map(({ data, ...restPage }) => ({
              data: data.map((answerComment) => {
                if (answerComment.id === id) {
                  const { numVotes, ...restAnswerComment } = answerComment;
                  return {
                    numVotes: numVotes + voteValueChange,
                    ...restAnswerComment,
                  };
                }
                return answerComment;
              }),
              ...restPage,
            })),
            ...restQuery,
          };

          utils.queryClient.setQueryData(key, newQuery);

          revertFunctions.push(() => {
            utils.queryClient.setQueryData(key, query);
          });
        }
      }
      return () => {
        for (const revertFunction of revertFunctions) {
          revertFunction();
        }
      };
    },
    query: 'questions.answers.comments.user.getVote',
    setDownVoteKey: 'questions.answers.comments.user.setDownVote',
    setNoVoteKey: 'questions.answers.comments.user.setNoVote',
    setUpVoteKey: 'questions.answers.comments.user.setUpVote',
  });
}
