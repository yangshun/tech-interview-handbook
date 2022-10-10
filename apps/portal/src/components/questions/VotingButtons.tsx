import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import type { ButtonSize } from '@tih/ui';
import { Button } from '@tih/ui';

import { VoteState } from '~/utils/questions/useVote';

export type VotingButtonsCallbackProps = {
  onDownvote: () => void;
  onUpvote: () => void;
  voteState: VoteState;
};

export type VotingButtonsProps = VotingButtonsCallbackProps & {
  size?: ButtonSize;
  upvoteCount: number;
};

export default function VotingButtons({
  voteState,
  onDownvote,
  onUpvote,
  upvoteCount,
  size = 'md',
}: VotingButtonsProps) {
  const upvoteButtonVarient =
    voteState === VoteState.UPVOTE ? 'secondary' : 'tertiary';
  const downvoteButtonVarient =
    voteState === VoteState.DOWNVOTE ? 'secondary' : 'tertiary';
  return (
    <div className="flex flex-col items-center">
      <Button
        icon={ChevronUpIcon}
        isLabelHidden={true}
        label="Upvote"
        size={size}
        variant={upvoteButtonVarient}
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
        variant={downvoteButtonVarient}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onDownvote();
        }}
      />
    </div>
  );
}
