import clsx from 'clsx';
import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import type { Vote } from '@prisma/client';

import { useProtectedCallback } from '~/utils/questions/useProtectedCallback';

export type BackendVote = {
  id: string;
  vote: Vote;
};

export type VotingButtonsCallbackProps = {
  onDownvote: () => void;
  onUpvote: () => void;
  vote: BackendVote | null;
};

export type VotingButtonsProps = VotingButtonsCallbackProps & {
  size?: 'md' | 'sm';
  upvoteCount: number;
};

export default function VotingButtons({
  vote,
  onDownvote,
  onUpvote,
  upvoteCount,
  size = 'md',
}: VotingButtonsProps) {
  const handleUpvoteClick = useProtectedCallback(() => {
    onUpvote();
  });

  const handleDownvoteClick = useProtectedCallback(() => {
    onDownvote();
  });

  return (
    <div className="flex flex-col items-center">
      <button
        aria-label="Upvote"
        className={clsx(
          'rounded-full p-1 hover:bg-slate-100',
          vote?.vote === 'UPVOTE' && 'bg-primary-50',
        )}
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          handleUpvoteClick();
        }}>
        <ChevronUpIcon
          className={clsx(
            size === 'sm' && 'h-5 w-5',
            size === 'md' && 'h-6 w-6',
            vote?.vote === 'UPVOTE'
              ? 'text-primary-500'
              : 'hover:text-primary-500 text-slate-400',
          )}
        />
      </button>
      <p>{upvoteCount}</p>
      <button
        aria-label="Downvote"
        className={clsx(
          'rounded-full p-1 hover:bg-slate-100',
          vote?.vote === 'DOWNVOTE' && 'bg-danger-50',
        )}
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          handleDownvoteClick();
        }}>
        <ChevronDownIcon
          className={clsx(
            size === 'sm' && 'h-5 w-5',
            size === 'md' && 'h-6 w-6',
            vote?.vote === 'DOWNVOTE'
              ? 'text-danger-500'
              : 'hover:text-danger-500 text-slate-400',
          )}
        />
      </button>
    </div>
  );
}
