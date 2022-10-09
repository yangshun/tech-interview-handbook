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
  return (
    <div className="flex flex-col items-center">
      <Button
        icon={ChevronUpIcon}
        isLabelHidden={true}
        label="Upvote"
        size={size}
        variant="tertiary"
      />
      <p>{upvoteCount}</p>
      <Button
        icon={ChevronDownIcon}
        isLabelHidden={true}
        label="Downvote"
        size={size}
        variant="tertiary"
      />
    </div>
  );
}
