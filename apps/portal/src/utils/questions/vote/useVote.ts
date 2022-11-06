/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { Vote } from '@prisma/client';

import { trpc } from '../../trpc';

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

const getVoteValue = (vote: Vote | null) => {
  if (vote === Vote.UPVOTE) {
    return 1;
  }
  if (vote === Vote.DOWNVOTE) {
    return -1;
  }
  return 0;
};

type RevertFunction = () => void;

type InvalidateFunction = (voteValueChange: number) => Promise<RevertFunction>;

type VoteProps<VoteQueryKey extends QueryKey = QueryKey> = {
  idKey: string;
  invalidateKeys: Array<QueryKey>;
  onMutate?: InvalidateFunction;
  query: VoteQueryKey;
  setDownVoteKey: MutationKey;
  setNoVoteKey: MutationKey;
  setUpVoteKey: MutationKey;
};

type UseVoteMutationContext = {
  currentData: any;
  previousData: any;
  revert: RevertFunction | undefined;
};

export default function useVote<VoteQueryKey extends QueryKey = QueryKey>(
  id: string,
  opts: VoteProps<VoteQueryKey>,
) {
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

  const onVoteUpdateSettled = useCallback(() => {
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
          context.revert?.();
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

        const voteValueChange =
          getVoteValue(currentData?.vote ?? null) -
          getVoteValue(previousData?.vote ?? null);

        const revert = await onMutate?.(voteValueChange);
        return { currentData, previousData, revert };
      },
      onSettled: onVoteUpdateSettled,
    },
  );
  const { mutate: setDownVote } = trpc.useMutation<any, UseVoteMutationContext>(
    setDownVoteKey,
    {
      onError: (_error, _variables, context) => {
        if (context !== undefined) {
          utils.setQueryData([query], context.previousData);
          context.revert?.();
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

        const voteValueChange =
          getVoteValue(currentData?.vote ?? null) -
          getVoteValue(previousData?.vote ?? null);

        const revert = await onMutate?.(voteValueChange);
        return { currentData, previousData, revert };
      },
      onSettled: onVoteUpdateSettled,
    },
  );

  const { mutate: setNoVote } = trpc.useMutation<any, UseVoteMutationContext>(
    setNoVoteKey,
    {
      onError: (_error, _variables, context) => {
        if (context !== undefined) {
          utils.setQueryData([query], context.previousData);
          context.revert?.();
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

        const voteValueChange =
          getVoteValue(null) - getVoteValue(previousData?.vote ?? null);

        const revert = await onMutate?.(voteValueChange);
        return { currentData, previousData, revert };
      },
      onSettled: onVoteUpdateSettled,
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
}
