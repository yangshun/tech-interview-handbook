/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import type { Vote } from '@prisma/client';

import { trpc } from '../trpc';

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
  return useVote(id, {
    idKey: 'questionId',
    invalidateKeys: [
      'questions.questions.getQuestionsByFilter',
      'questions.questions.getQuestionById',
    ],
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
      'questions.answers.getAnswers',
      'questions.answers.getAnswerById',
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

type VoteProps<VoteQueryKey extends QueryKey = QueryKey> = {
  idKey: string;
  invalidateKeys: Array<VoteQueryKey>;
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
    query,
    setDownVoteKey,
    setNoVoteKey,
    setUpVoteKey,
  } = opts;
  const utils = trpc.useContext();

  const onVoteUpdate = useCallback(() => {
    // TODO: Optimise query invalidation
    utils.invalidateQueries([query, { [idKey]: id } as any]);
    for (const invalidateKey of invalidateKeys) {
      utils.invalidateQueries([invalidateKey]);
    }
  }, [id, idKey, utils, query, invalidateKeys]);

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
      onError: (err, variables, context) => {
        if (context !== undefined) {
          utils.setQueryData([query], context.previousData);
        }
      },
      onMutate: async (vote) => {
        await utils.queryClient.cancelQueries([query, { [idKey]: id } as any]);
        const previousData = utils.queryClient.getQueryData<BackendVote | null>(
          [query, { [idKey]: id } as any],
        );

        utils.setQueryData(
          [
            query,
            {
              [idKey]: id,
            } as any,
          ],
          vote as any,
        );
        return { currentData: vote, previousData };
      },
      onSettled: onVoteUpdate,
    },
  );
  const { mutate: setDownVote } = trpc.useMutation<any, UseVoteMutationContext>(
    setDownVoteKey,
    {
      onError: (error, variables, context) => {
        if (context !== undefined) {
          utils.setQueryData([query], context.previousData);
        }
      },
      onMutate: async (vote) => {
        await utils.queryClient.cancelQueries([query, { [idKey]: id } as any]);
        const previousData = utils.queryClient.getQueryData<BackendVote | null>(
          [query, { [idKey]: id } as any],
        );

        utils.setQueryData(
          [
            query,
            {
              [idKey]: id,
            } as any,
          ],
          vote,
        );
        return { currentData: vote, previousData };
      },
      onSettled: onVoteUpdate,
    },
  );

  const { mutate: setNoVote } = trpc.useMutation<any, UseVoteMutationContext>(
    setNoVoteKey,
    {
      onError: (err, variables, context) => {
        if (context !== undefined) {
          utils.setQueryData([query], context.previousData);
        }
      },
      onMutate: async (vote) => {
        await utils.queryClient.cancelQueries([query, { [idKey]: id } as any]);
        utils.setQueryData(
          [
            query,
            {
              [idKey]: id,
            } as any,
          ],
          null as any,
        );
        return { currentData: null, previousData: vote };
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
