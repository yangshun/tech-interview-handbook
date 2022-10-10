/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import type { Vote } from '@prisma/client';

import { trpc } from '../trpc';

type UseVoteOptions = {
  createVote: (opts: { vote: Vote }) => void;
  deleteVote: (opts: { id: string }) => void;
  updateVote: (opts: BackendVote) => void;
};

type BackendVote = {
  id: string;
  vote: Vote;
};

const createVoteCallbacks = (
  vote: BackendVote | null,
  opts: UseVoteOptions,
) => {
  const { createVote, updateVote, deleteVote } = opts;

  const handleUpvote = () => {
    // Either upvote or remove upvote
    if (vote) {
      if (vote.vote === 'DOWNVOTE') {
        updateVote({
          id: vote.id,
          vote: 'UPVOTE',
        });
      } else {
        deleteVote({
          id: vote.id,
        });
      }
      // Update vote to an upvote
    } else {
      createVote({
        vote: 'UPVOTE',
      });
    }
  };

  const handleDownvote = () => {
    // Either downvote or remove downvote
    if (vote) {
      if (vote.vote === 'UPVOTE') {
        updateVote({
          id: vote.id,
          vote: 'DOWNVOTE',
        });
      } else {
        deleteVote({
          id: vote.id,
        });
      }
      // Update vote to an upvote
    } else {
      createVote({
        vote: 'DOWNVOTE',
      });
    }
  };

  return { handleDownvote, handleUpvote };
};

type MutationKey = Parameters<typeof trpc.useMutation>[0];
type QueryKey = Parameters<typeof trpc.useQuery>[0][0];

export const useQuestionVote = (id: string) => {
  return useVote(id, {
    create: 'questions.questions.createVote',
    deleteKey: 'questions.questions.deleteVote',
    idKey: 'questionId',
    query: 'questions.questions.getVote',
    update: 'questions.questions.updateVote',
  });
};

export const useAnswerVote = (id: string) => {
  return useVote(id, {
    create: 'questions.answers.createVote',
    deleteKey: 'questions.answers.deleteVote',
    idKey: 'answerId',
    query: 'questions.answers.getVote',
    update: 'questions.answers.updateVote',
  });
};

export const useQuestionCommentVote = (id: string) => {
  return useVote(id, {
    create: 'questions.questions.comments.createVote',
    deleteKey: 'questions.questions.comments.deleteVote',
    idKey: 'questionCommentId',
    query: 'questions.questions.comments.getVote',
    update: 'questions.questions.comments.updateVote',
  });
};

export const useAnswerCommentVote = (id: string) => {
  return useVote(id, {
    create: 'questions.answers.comments.createVote',
    deleteKey: 'questions.answers.comments.deleteVote',
    idKey: 'answerCommentId',
    query: 'questions.answers.comments.getVote',
    update: 'questions.answers.comments.updateVote',
  });
};

type VoteProps<VoteQueryKey extends QueryKey = QueryKey> = {
  create: MutationKey;
  deleteKey: MutationKey;
  idKey: string;
  query: VoteQueryKey;
  update: MutationKey;
};

export const useVote = <VoteQueryKey extends QueryKey = QueryKey>(
  id: string,
  opts: VoteProps<VoteQueryKey>,
) => {
  const { create, deleteKey, query, update, idKey } = opts;
  const utils = trpc.useContext();

  const onVoteUpdate = useCallback(() => {
    // TODO: Optimise query invalidation
    utils.invalidateQueries([query, { [idKey]: id } as any]);
    utils.invalidateQueries(['questions.questions.getQuestionsByFilter']);
    utils.invalidateQueries(['questions.questions.getQuestionById']);
    utils.invalidateQueries(['questions.answers.getAnswers']);
    utils.invalidateQueries(['questions.answers.getAnswerById']);
    utils.invalidateQueries([
      'questions.questions.comments.getQuestionComments',
    ]);
    utils.invalidateQueries(['questions.answers.comments.getAnswerComments']);
  }, [id, idKey, utils, query]);

  const { data } = trpc.useQuery([
    query,
    {
      [idKey]: id,
    },
  ] as any);

  const backendVote = data as BackendVote;

  const { mutate: createVote } = trpc.useMutation(create, {
    onSuccess: onVoteUpdate,
  });
  const { mutate: updateVote } = trpc.useMutation(update, {
    onSuccess: onVoteUpdate,
  });

  const { mutate: deleteVote } = trpc.useMutation(deleteKey, {
    onSuccess: onVoteUpdate,
  });

  const { handleDownvote, handleUpvote } = createVoteCallbacks(
    backendVote ?? null,
    {
      createVote: ({ vote }) => {
        createVote({
          [idKey]: id,
          vote,
        } as any);
      },
      deleteVote,
      updateVote,
    },
  );

  return { handleDownvote, handleUpvote, vote: backendVote ?? null };
};
