import { format } from 'date-fns';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

import type { VotingButtonsProps } from '../VotingButtons';
import VotingButtons from '../VotingButtons';

export type AnswerCardProps = {
  authorImageUrl: string;
  authorName: string;
  commentCount?: number;
  content: string;
  createdAt: Date;
  upvoteCount: number;
  votingButtonsSize: VotingButtonsProps['size'];
};

export default function AnswerCard({
  authorName,
  authorImageUrl,
  upvoteCount,
  content,
  createdAt,
  commentCount,
  votingButtonsSize,
}: AnswerCardProps) {
  return (
    <article className="flex gap-4 rounded-md border bg-white p-2">
      <VotingButtons size={votingButtonsSize} upvoteCount={upvoteCount} />
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
            <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
            <p className="text-sm font-medium">
              {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
