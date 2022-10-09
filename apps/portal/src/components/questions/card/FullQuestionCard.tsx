import { Badge } from '@tih/ui';

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

export type FullQuestionCardProps = UpvoteProps & {
  company: string;
  content: string;
  location: string;
  receivedCount: number;
  role: string;
  timestamp: string;
  type: string;
};

export default function FullQuestionCard({
  company,
  content,
  showVoteButtons,
  upvoteCount,
  timestamp,
  role,
  location,
  type,
}: FullQuestionCardProps) {
  const altText = company + ' logo';
  return (
    <article className="flex gap-4 rounded-md border border-slate-300 bg-white p-4">
      {showVoteButtons && <VotingButtons upvoteCount={upvoteCount} />}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img alt={altText} src="https://logo.clearbit.com/google.com"></img>
          <h2 className="ml-2 text-xl">{company}</h2>
        </div>
        <div className="flex items-baseline justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <Badge label={type} variant="primary" />
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
