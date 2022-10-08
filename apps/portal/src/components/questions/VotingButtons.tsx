import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Button } from '@tih/ui';

export type VotingButtonsProps = {
  upvoteCount: number;
};

export default function VotingButtons({ upvoteCount }: VotingButtonsProps) {
  return (
    <div className="flex flex-col items-center">
      <Button
        icon={ChevronUpIcon}
        isLabelHidden={true}
        label="Upvote"
        variant="tertiary"
      />
      <p>{upvoteCount}</p>
      <Button
        icon={ChevronDownIcon}
        isLabelHidden={true}
        label="Downvote"
        variant="tertiary"
      />
    </div>
  );
}
