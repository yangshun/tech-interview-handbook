import type { QuestionsQuestionType } from '@prisma/client';
import { Badge } from '@tih/ui';

import QuestionTypeBadge from '../QuestionTypeBadge';
import type { VotingButtonsCallbackProps } from '../VotingButtons';
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

export type FullQuestionCardProps = UpvoteProps &
  VotingButtonsCallbackProps & {
    company: string;
    content: string;
    location: string;
    receivedCount: number;
    role: string;
    timestamp: string;
    type: QuestionsQuestionType;
  };

export default function FullQuestionCard({
  voteState,
  onDownvote,
  onUpvote,
  company,
  content,
  showVoteButtons,
  upvoteCount,
  timestamp,
  role,
  location,
  type,
}: FullQuestionCardProps) {
  const altText = `${company} logo`;
  return (
    <article className="flex gap-4 rounded-md border border-slate-300 bg-white p-4">
      {showVoteButtons && (
        <VotingButtons
          upvoteCount={upvoteCount}
          voteState={voteState}
          onDownvote={onDownvote}
          onUpvote={onUpvote}
        />
      )}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img alt={altText} src="https://logo.clearbit.com/google.com"></img>
        </div>
        <div className="flex items-baseline justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <Badge label={company} variant="primary" />
            <QuestionTypeBadge type={type} />
            <p className="text-xs">
              {timestamp} · {location} · {role}
            </p>
          </div>
        </div>
        <div className="mx-2 mb-2">
          <p>{content}</p>
        </div>
      </div>
    </article>
  );
}
