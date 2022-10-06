import {
  ChatBubbleBottomCenterTextIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { Badge, Button } from '@tih/ui';

export type QuestionOverviewCardProps = {
  answerCount: number;
  content: string;
  location: string;
  role: string;
  similarCount: number;
  timestamp: string;
  upvoteCount: number;
};

export default function QuestionOverviewCard({
  answerCount,
  content,
  similarCount,
  upvoteCount,
  timestamp,
  role,
  location,
}: QuestionOverviewCardProps) {
  return (
    <article className="flex gap-2 rounded-md border border-slate-300 p-4">
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
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-slate-500">
          <Badge label="Technical" variant="primary" />
          <p className="text-xs">
            {timestamp} · {location} · {role}
          </p>
        </div>
        <p className="line-clamp-2 text-ellipsis">{content}</p>
        <div className="flex gap-2">
          <Button
            addonPosition="start"
            icon={ChatBubbleBottomCenterTextIcon}
            label={`${answerCount} answers`}
            size="sm"
            variant="tertiary"
          />
          <Button
            addonPosition="start"
            icon={EyeIcon}
            label={`${similarCount} received this`}
            size="sm"
            variant="tertiary"
          />
        </div>
      </div>
    </article>
  );
}
