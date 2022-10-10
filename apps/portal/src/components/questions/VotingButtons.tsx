import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import type { ButtonSize } from '@tih/ui';
import { Button } from '@tih/ui';

export type VotingButtonsProps = {
  size?: ButtonSize;
  upvoteCount: number;
};

export default function VotingButtons({
  upvoteCount,
  size = 'md',
}: VotingButtonsProps) {
  const handleUpvote = (event: React.MouseEvent) => {
    event.preventDefault();

    event.stopPropagation();
    console.log('upvote');
  };

  const handleDownVote = (event: React.MouseEvent) => {
    event.preventDefault();

    event.stopPropagation();

    console.log('downvote');
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        icon={ChevronUpIcon}
        isLabelHidden={true}
        label="Upvote"
        size={size}
        variant="tertiary"
        onClick={handleUpvote}
      />
      <p>{upvoteCount}</p>
      <Button
        icon={ChevronDownIcon}
        isLabelHidden={true}
        label="Downvote"
        size={size}
        variant="tertiary"
        onClick={handleDownVote}
      />
    </div>
  );
}
