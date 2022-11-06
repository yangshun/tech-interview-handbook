import type { InfiniteData } from 'react-query';

import { trpc } from '~/utils/trpc';

import useVote from './useVote';

import type { Answer } from '~/types/questions';

export default function useAnswerVote(id: string) {
  const utils = trpc.useContext();

  return useVote(id, {
    idKey: 'answerId',
    invalidateKeys: [
      // 'questions.answers.getAnswerById',
      // 'questions.answers.getAnswers',
    ],
    onMutate: async (voteValueChange) => {
      // Update question answer list
      const answerQueries = utils.queryClient.getQueriesData([
        'questions.answers.getAnswers',
      ]);

      const revertFunctions: Array<() => void> = [];

      if (answerQueries !== undefined) {
        for (const [key, query] of answerQueries) {
          if (query === undefined) {
            continue;
          }

          const { pages, ...restQuery } = query as InfiniteData<{
            data: Array<Answer>;
          }>;

          const newQuery = {
            pages: pages.map(({ data, ...restPage }) => ({
              data: data.map((answer) => {
                if (answer.id === id) {
                  const { numVotes, ...restAnswer } = answer;
                  return {
                    numVotes: numVotes + voteValueChange,
                    ...restAnswer,
                  };
                }
                return answer;
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

      const prevAnswer = utils.queryClient.getQueryData([
        'questions.answers.getAnswerById',
        {
          answerId: id,
        },
      ]) as Answer | undefined;

      if (prevAnswer !== undefined) {
        const newAnswer = {
          ...prevAnswer,
          numVotes: prevAnswer.numVotes + voteValueChange,
        };

        utils.queryClient.setQueryData(
          ['questions.answers.getAnswerById', { answerId: id }],
          newAnswer,
        );

        revertFunctions.push(() => {
          utils.queryClient.setQueryData(
            ['questions.answers.getAnswerById', { answerId: id }],
            prevAnswer,
          );
        });
      }

      return () => {
        for (const revertFunction of revertFunctions) {
          revertFunction();
        }
      };
    },
    query: 'questions.answers.user.getVote',
    setDownVoteKey: 'questions.answers.user.setDownVote',
    setNoVoteKey: 'questions.answers.user.setNoVote',
    setUpVoteKey: 'questions.answers.user.setUpVote',
  });
}
