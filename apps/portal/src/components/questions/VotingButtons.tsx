import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import type { Vote } from '@prisma/client';
import type { ButtonSize } from '@tih/ui';
import { Button } from '@tih/ui';

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
  size?: ButtonSize;
  upvoteCount: number;
};

export default function VotingButtons({
  vote,
  onDownvote,
  onUpvote,
  upvoteCount,
  size = 'md',
}: VotingButtonsProps) {
  const upvoteButtonVariant =
    vote?.vote === 'UPVOTE' ? 'secondary' : 'tertiary';
  const downvoteButtonVariant =
    vote?.vote === 'DOWNVOTE' ? 'secondary' : 'tertiary';
  return (
    <div className="flex flex-col items-center">
      <Button
        icon={ChevronUpIcon}
        isLabelHidden={true}
        label="Upvote"
        size={size}
        variant={upvoteButtonVariant}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onUpvote();
        }}
      />
      <p>{upvoteCount}</p>
      <Button
        icon={ChevronDownIcon}
        isLabelHidden={true}
        label="Downvote"
        size={size}
        variant={downvoteButtonVariant}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onDownvote();
        }}
      />
    </div>
  );
}
