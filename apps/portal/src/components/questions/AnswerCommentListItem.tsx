import { format } from 'date-fns';

import { useAnswerCommentVote } from '~/utils/questions/useVote';

import VotingButtons from './VotingButtons';

export type AnswerCommentListItemProps = {
  answerCommentId: string;
  authorImageUrl: string;
  authorName: string;
  content: string;
  createdAt: Date;
  upvoteCount: number;
};

export default function AnswerCommentListItem({
  authorImageUrl,
  authorName,
  content,
  createdAt,
  upvoteCount,
  answerCommentId,
}: AnswerCommentListItemProps) {
  const { handleDownvote, handleUpvote, vote } =
    useAnswerCommentVote(answerCommentId);

  return (
    <div className="flex gap-4 rounded-md border bg-white p-2">
      <VotingButtons
        size="sm"
        upvoteCount={upvoteCount}
        vote={vote}
        onDownvote={handleDownvote}
        onUpvote={handleUpvote}
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
        <p className="pl-1 pt-1">{content}</p>
      </div>
    </div>
  );
}
