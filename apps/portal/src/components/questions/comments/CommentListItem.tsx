import { format } from 'date-fns';

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
    <div className="flex gap-4 rounded-md border bg-white p-2">
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
            alt={`${authorName} profile picture`}
            className="h-8 w-8 rounded-full"
            src={authorImageUrl}></img>
          <h1 className="font-bold">{authorName}</h1>
          <p className="pt-1 text-xs font-extralight">
            Posted on: {format(createdAt, 'h:mm a, MMMM dd, yyyy')}
          </p>
        </div>
        <p className="whitespace-pre-line">{content}</p>
      </div>
    </div>
  );
}
