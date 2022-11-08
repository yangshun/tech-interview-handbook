import { formatDistanceToNow } from 'date-fns';

import type { BackendVote } from '../VotingButtons';
import VotingButtons from '../VotingButtons';

export type CommentListItemProps = {
  authorImageUrl: string;
  authorName: string;
  content: string;
  createdAt: Date;
  onDownvote: () => void;
  onUpvote: () => void;
  upvoteCount: number;
  vote: BackendVote;
};

export default function CommentListItem({
  authorImageUrl,
  authorName,
  content,
  createdAt,
  upvoteCount,
  vote,
  onDownvote,
  onUpvote,
}: CommentListItemProps) {
  return (
    <div className="flex gap-4 rounded-md border border-slate-200 bg-white p-2">
      <VotingButtons
        size="sm"
        upvoteCount={upvoteCount}
        vote={vote}
        onDownvote={onDownvote}
        onUpvote={onUpvote}
      />
      <div className="mt-1 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <img
            alt={authorName}
            className="h-7 w-7 rounded-full"
            src={authorImageUrl}
          />
          <p className="text-sm font-medium text-slate-900">{authorName}</p>
          <span className="font-medium text-slate-500">·</span>
          <p className="text-xs text-slate-500">
            {formatDistanceToNow(createdAt, {
              addSuffix: true,
            })}
          </p>
        </div>
        <p className="whitespace-pre-wrap text-xs sm:text-sm">{content}</p>
      </div>
    </div>
  );
}
