import type { InfiniteData } from 'react-query';

import { trpc } from '~/utils/trpc';

import useVote from './useVote';

import type { QuestionComment } from '~/types/questions';

export default function useQuestionCommentVote(id: string) {
  const utils = trpc.useContext();

  return useVote(id, {
    idKey: 'questionCommentId',
    invalidateKeys: [],
    onMutate: async (voteValueChange) => {
      // Update question comment list
      const questionCommentQueries = utils.queryClient.getQueriesData([
        'questions.questions.comments.getQuestionComments',
      ]);

      const revertFunctions: Array<() => void> = [];

      if (questionCommentQueries !== undefined) {
        for (const [key, query] of questionCommentQueries) {
          if (query === undefined) {
            continue;
          }

          const { pages, ...restQuery } = query as InfiniteData<{
            data: Array<QuestionComment>;
          }>;

          const newQuery = {
            pages: pages.map(({ data, ...restPage }) => ({
              data: data.map((questionComment) => {
                if (questionComment.id === id) {
                  const { numVotes, ...restQuestionComment } = questionComment;
                  return {
                    numVotes: numVotes + voteValueChange,
                    ...restQuestionComment,
                  };
                }
                return questionComment;
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
    query: 'questions.questions.comments.user.getVote',
    setDownVoteKey: 'questions.questions.comments.user.setDownVote',
    setNoVoteKey: 'questions.questions.comments.user.setNoVote',
    setUpVoteKey: 'questions.questions.comments.user.setUpVote',
  });
}
