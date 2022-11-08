import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';
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

  return (
    <article
      className={clsx(
        'flex gap-4 rounded-md border border-slate-200 bg-white p-4 sm:rounded-lg',
        showHover && 'hover:bg-slate-50',
      )}>
      <VotingButtons
        size={votingButtonsSize}
        upvoteCount={upvoteCount}
        vote={vote}
        onDownvote={handleDownvote}
        onUpvote={handleUpvote}
      />
      <div className="flex w-full flex-col gap-2">
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
        <div className="-ml-2">
          {commentCount !== undefined && (
            <button
              className="-my-1 flex items-center rounded-md px-2
                  py-1 text-xs font-medium
                  text-slate-500 hover:bg-slate-100 hover:text-slate-600"
              type="button">
              <ChatBubbleLeftRightIcon
                aria-hidden={true}
                className="mr-2 h-5 w-5"
              />
              {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
