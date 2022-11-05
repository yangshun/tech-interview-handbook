/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import type { InfiniteData } from 'react-query';
import { Vote } from '@prisma/client';

import { trpc } from '../trpc';

import type { Question } from '~/types/questions';

type UseVoteOptions = {
  setDownVote: () => void;
  setNoVote: () => void;
  setUpVote: () => void;
};

type BackendVote = {
  id: string;
  vote: Vote;
};

const createVoteCallbacks = (
  vote: BackendVote | null,
  opts: UseVoteOptions,
) => {
  const { setDownVote, setNoVote, setUpVote } = opts;

  const handleUpvote = () => {
    // Either upvote or remove upvote
    if (vote && vote.vote === 'UPVOTE') {
      setNoVote();
    } else {
      setUpVote();
    }
  };

  const handleDownvote = () => {
    // Either downvote or remove downvote
    if (vote && vote.vote === 'DOWNVOTE') {
      setNoVote();
    } else {
      setDownVote();
    }
  };

  return { handleDownvote, handleUpvote };
};

type MutationKey = Parameters<typeof trpc.useMutation>[0];
type QueryKey = Parameters<typeof trpc.useQuery>[0][0];

export const useQuestionVote = (id: string) => {
  const utils = trpc.useContext();

  return useVote(id, {
    idKey: 'questionId',
    invalidateKeys: [
      // 'questions.questions.getQuestionById',
      // 'questions.questions.getQuestionsByFilterAndContent',
    ],
    onMutate: async (previousVote, currentVote) => {
      const questionQueries = utils.queryClient.getQueriesData([
        'questions.questions.getQuestionsByFilterAndContent',
      ]);

      const getVoteValue = (vote: Vote | null) => {
        if (vote === Vote.UPVOTE) {
          return 1;
        }
        if (vote === Vote.DOWNVOTE) {
          return -1;
        }
        return 0;
      };

      const voteValueChange =
        getVoteValue(currentVote) - getVoteValue(previousVote);

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
      }

      const prevQuestion = utils.queryClient.getQueryData([
        'questions.questions.getQuestionById',
        {
          id,
        },
      ]) as Question;

      const newQuestion = {
        ...prevQuestion,
        numVotes: prevQuestion.numVotes + voteValueChange,
      };

      utils.queryClient.setQueryData(
        ['questions.questions.getQuestionById', { id }],
        newQuestion,
      );
    },
    query: 'questions.questions.user.getVote',
    setDownVoteKey: 'questions.questions.user.setDownVote',
    setNoVoteKey: 'questions.questions.user.setNoVote',
    setUpVoteKey: 'questions.questions.user.setUpVote',
  });
};

export const useAnswerVote = (id: string) => {
  return useVote(id, {
    idKey: 'answerId',
    invalidateKeys: [
      'questions.answers.getAnswerById',
      'questions.answers.getAnswers',
    ],
    query: 'questions.answers.user.getVote',
    setDownVoteKey: 'questions.answers.user.setDownVote',
    setNoVoteKey: 'questions.answers.user.setNoVote',
    setUpVoteKey: 'questions.answers.user.setUpVote',
  });
};

export const useQuestionCommentVote = (id: string) => {
  return useVote(id, {
    idKey: 'questionCommentId',
    invalidateKeys: ['questions.questions.comments.getQuestionComments'],
    query: 'questions.questions.comments.user.getVote',
    setDownVoteKey: 'questions.questions.comments.user.setDownVote',
    setNoVoteKey: 'questions.questions.comments.user.setNoVote',
    setUpVoteKey: 'questions.questions.comments.user.setUpVote',
  });
};

export const useAnswerCommentVote = (id: string) => {
  return useVote(id, {
    idKey: 'answerCommentId',
    invalidateKeys: ['questions.answers.comments.getAnswerComments'],
    query: 'questions.answers.comments.user.getVote',
    setDownVoteKey: 'questions.answers.comments.user.setDownVote',
    setNoVoteKey: 'questions.answers.comments.user.setNoVote',
    setUpVoteKey: 'questions.answers.comments.user.setUpVote',
  });
};

type InvalidateFunction = (
  previousVote: Vote | null,
  currentVote: Vote | null,
) => Promise<void>;

type VoteProps<VoteQueryKey extends QueryKey = QueryKey> = {
  idKey: string;
  invalidateKeys: Array<QueryKey>;
  onMutate?: InvalidateFunction;

  // Invalidate: Partial<Record<QueryKey, InvalidateFunction | null>>;
  query: VoteQueryKey;
  setDownVoteKey: MutationKey;
  setNoVoteKey: MutationKey;
  setUpVoteKey: MutationKey;
};

type UseVoteMutationContext = {
  currentData: any;
  previousData: any;
};

export const useVote = <VoteQueryKey extends QueryKey = QueryKey>(
  id: string,
  opts: VoteProps<VoteQueryKey>,
) => {
  const {
    idKey,
    invalidateKeys,
    onMutate,
    query,
    setDownVoteKey,
    setNoVoteKey,
    setUpVoteKey,
  } = opts;
  const utils = trpc.useContext();

  const onVoteUpdate = useCallback(() => {
    // TODO: Optimise query invalidation
    // utils.invalidateQueries([query, { [idKey]: id } as any]);
    for (const invalidateKey of invalidateKeys) {
      utils.invalidateQueries(invalidateKey);
      // If (invalidateFunction === null) {
      //   utils.invalidateQueries([invalidateKey as QueryKey]);
      // } else {
      //   invalidateFunction(utils, previousVote, currentVote);
      // }
    }
  }, [utils, invalidateKeys]);

  const { data } = trpc.useQuery([
    query,
    {
      [idKey]: id,
    },
  ] as any);

  const backendVote = data as BackendVote;

  const { mutate: setUpVote } = trpc.useMutation<any, UseVoteMutationContext>(
    setUpVoteKey,
    {
      onError: (_error, _variables, context) => {
        if (context !== undefined) {
          utils.setQueryData([query], context.previousData);
        }
      },
      onMutate: async (vote) => {
        await utils.queryClient.cancelQueries([query, { [idKey]: id } as any]);
        const previousData = utils.queryClient.getQueryData<BackendVote | null>(
          [query, { [idKey]: id } as any],
        );

        const currentData = {
          ...(vote as any),
          vote: Vote.UPVOTE,
        } as BackendVote;

        utils.setQueryData(
          [
            query,
            {
              [idKey]: id,
            } as any,
          ],
          currentData as any,
        );

        await onMutate?.(previousData?.vote ?? null, currentData?.vote ?? null);
        return { currentData, previousData };
      },
      onSettled: onVoteUpdate,
    },
  );
  const { mutate: setDownVote } = trpc.useMutation<any, UseVoteMutationContext>(
    setDownVoteKey,
    {
      onError: (_error, _variables, context) => {
        if (context !== undefined) {
          utils.setQueryData([query], context.previousData);
        }
      },
      onMutate: async (vote) => {
        await utils.queryClient.cancelQueries([query, { [idKey]: id } as any]);
        const previousData = utils.queryClient.getQueryData<BackendVote | null>(
          [query, { [idKey]: id } as any],
        );

        const currentData = {
          ...vote,
          vote: Vote.DOWNVOTE,
        } as BackendVote;

        utils.setQueryData(
          [
            query,
            {
              [idKey]: id,
            } as any,
          ],
          currentData as any,
        );

        await onMutate?.(previousData?.vote ?? null, currentData?.vote ?? null);
        return { currentData, previousData };
      },
      onSettled: onVoteUpdate,
    },
  );

  const { mutate: setNoVote } = trpc.useMutation<any, UseVoteMutationContext>(
    setNoVoteKey,
    {
      onError: (_error, _variables, context) => {
        if (context !== undefined) {
          utils.setQueryData([query], context.previousData);
        }
      },
      onMutate: async () => {
        await utils.queryClient.cancelQueries([query, { [idKey]: id } as any]);
        const previousData = utils.queryClient.getQueryData<BackendVote | null>(
          [query, { [idKey]: id } as any],
        );
        const currentData: BackendVote | null = null;

        utils.queryClient.setQueryData<BackendVote | null>(
          [
            query,
            {
              [idKey]: id,
            } as any,
          ],
          currentData,
        );

        await onMutate?.(previousData?.vote ?? null, null);

        return { currentData, previousData };
      },
      onSettled: onVoteUpdate,
    },
  );

  const { handleDownvote, handleUpvote } = createVoteCallbacks(
    backendVote ?? null,
    {
      setDownVote: () => {
        setDownVote({
          [idKey]: id,
        });
      },
      setNoVote: () => {
        setNoVote({
          [idKey]: id,
        });
      },
      setUpVote: () => {
        setUpVote({
          [idKey]: id,
        });
      },
    },
  );

  return { handleDownvote, handleUpvote, vote: backendVote ?? null };
};
