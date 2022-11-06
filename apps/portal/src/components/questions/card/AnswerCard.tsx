import { format } from 'date-fns';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

import useAnswerVote from '~/utils/questions/vote/useAnswerVote';

import type { VotingButtonsProps } from '../VotingButtons';
import VotingButtons from '../VotingButtons';

export type AnswerCardProps = {
  answerId: string;
  authorImageUrl: string;
  authorName: string;
  commentCount?: number;
  content: string;
  createdAt: Date;
  showHover?: boolean;
  upvoteCount: number;
  votingButtonsSize: VotingButtonsProps['size'];
};

export default function AnswerCard({
  answerId,
  authorName,
  authorImageUrl,
  content,
  createdAt,
  commentCount,
  votingButtonsSize,
  upvoteCount,
  showHover,
}: AnswerCardProps) {
  const { handleUpvote, handleDownvote, vote } = useAnswerVote(answerId);
  const hoverClass = showHover ? 'hover:bg-slate-50' : '';

  return (
    <article
      className={`flex gap-4 rounded-md border bg-white p-2 ${hoverClass}`}>
      <VotingButtons
        size={votingButtonsSize}
        upvoteCount={upvoteCount}
        vote={vote}
        onDownvote={handleDownvote}
        onUpvote={handleUpvote}
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img
            alt={`${authorName} profile picture`}
            className="h-8 w-8 rounded-full"
            src={authorImageUrl}></img>
          <h1 className="font-bold">{authorName}</h1>
          <p className="text-xs font-extralight">
            Posted on: {format(createdAt, 'h:mm a, MMMM dd, yyyy')}
          </p>
        </div>
        <p>{content}</p>
        {commentCount !== undefined && (
          <div className="flex items-center gap-2 text-slate-500">
            <ChatBubbleLeftRightIcon className="h-6 w-6" />
            <p className="text-sm font-medium">
              {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
