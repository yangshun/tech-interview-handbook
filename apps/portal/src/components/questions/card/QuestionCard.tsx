import {
  ChatBubbleBottomCenterTextIcon,
  // EyeIcon,
} from '@heroicons/react/24/outline';
import { Badge, Button } from '@tih/ui';

import VotingButtons from '../VotingButtons';

type UpvoteProps =
  | {
      showVoteButtons: true;
      upvoteCount: number;
    }
  | {
      showVoteButtons?: false;
      upvoteCount?: never;
    };

type StatisticsProps =
  | {
      answerCount: number;
      showUserStatistics: true;
    }
  | {
      answerCount?: never;
      showUserStatistics?: false;
    };

type ActionButtonProps =
  | {
      actionButtonLabel: string;
      onActionButtonClick: () => void;
      showActionButton: true;
    }
  | {
      actionButtonLabel?: never;
      onActionButtonClick?: never;
      showActionButton?: false;
    };

export type QuestionCardProps = ActionButtonProps &
  StatisticsProps &
  UpvoteProps & {
    content: string;
    href?: string;
    location: string;
    receivedCount: number;
    role: string;
    timestamp: string;
  };

export default function QuestionCard({
  answerCount,
  content,
  // ReceivedCount,
  showVoteButtons,
  showUserStatistics,
  showActionButton,
  actionButtonLabel,
  onActionButtonClick,
  upvoteCount,
  timestamp,
  role,
  location,
}: QuestionCardProps) {
  return (
    <article className="flex gap-4 rounded-md border border-slate-300 bg-white p-4 hover:bg-slate-50">
      {showVoteButtons && <VotingButtons upvoteCount={upvoteCount} />}
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <Badge label="Technical" variant="primary" />
            <p className="text-xs">
              {timestamp} · {location} · {role}
            </p>
          </div>
          {showActionButton && (
            <Button
              label={actionButtonLabel}
              size="sm"
              variant="tertiary"
              onClick={onActionButtonClick}
            />
          )}
        </div>
        <div className="ml-2">
          <p className="line-clamp-2 text-ellipsis ">{content}</p>
        </div>
        {showUserStatistics && (
          <div className="flex gap-2">
            <Button
              addonPosition="start"
              icon={ChatBubbleBottomCenterTextIcon}
              label={`${answerCount} answers`}
              size="sm"
              variant="tertiary"
            />
            {/* <Button
              addonPosition="start"
              icon={EyeIcon}
              label={`${receivedCount} received this`}
              size="sm"
              variant="tertiary"
            /> */}
          </div>
        )}
      </div>
    </article>
  );
}
