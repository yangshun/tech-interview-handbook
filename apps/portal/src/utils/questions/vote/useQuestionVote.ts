import type { InfiniteData } from 'react-query';

import { trpc } from '~/utils/trpc';

import useVote from './useVote';

import type { Question } from '~/types/questions';

export const useQuestionVote = (id: string) => {
  const utils = trpc.useContext();

  return useVote(id, {
    idKey: 'questionId',
    invalidateKeys: [
      // 'questions.questions.getQuestionById',
      // 'questions.questions.getQuestionsByFilterAndContent',
    ],
    onMutate: async (voteValueChange) => {
      // Update question list
      const questionQueries = utils.queryClient.getQueriesData([
        'questions.questions.getQuestionsByFilterAndContent',
      ]);

      const revertFunctions: Array<() => void> = [];

      if (questionQueries !== undefined) {
        for (const [key, query] of questionQueries) {
          if (query === undefined) {
            continue;
          }

          const { pages, ...restQuery } = query as InfiniteData<{
            data: Array<Question>;
          }>;

          const newQuery = {
            pages: pages.map(({ data, ...restPage }) => ({
              data: data.map((question) => {
                if (question.id === id) {
                  const { numVotes, ...restQuestion } = question;
                  return {
                    numVotes: numVotes + voteValueChange,
                    ...restQuestion,
                  };
                }
                return question;
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

      const prevQuestion = utils.queryClient.getQueryData([
        'questions.questions.getQuestionById',
        {
          id,
        },
      ]) as Question | undefined;

      if (prevQuestion !== undefined) {
        const newQuestion = {
          ...prevQuestion,
          numVotes: prevQuestion.numVotes + voteValueChange,
        };

        utils.queryClient.setQueryData(
          ['questions.questions.getQuestionById', { id }],
          newQuestion,
        );

        revertFunctions.push(() => {
          utils.queryClient.setQueryData(
            ['questions.questions.getQuestionById', { id }],
            prevQuestion,
          );
        });
      }

      return () => {
        for (const revertFunction of revertFunctions) {
          revertFunction();
        }
      };
    },
    query: 'questions.questions.user.getVote',
    setDownVoteKey: 'questions.questions.user.setDownVote',
    setNoVoteKey: 'questions.questions.user.setNoVote',
    setUpVoteKey: 'questions.questions.user.setUpVote',
  });
};
