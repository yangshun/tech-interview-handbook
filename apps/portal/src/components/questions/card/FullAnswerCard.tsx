import { format } from 'date-fns';

import VotingButtons from '../VotingButtons';

export type FullAnswerCardProps = {
  authorImageUrl: string;
  authorName: string;
  content: string;
  createdAt: Date;
  upvoteCount: number;
};

export default function FullAnswerCard({
  authorImageUrl,
  authorName,
  content,
  createdAt,
  upvoteCount,
}: FullAnswerCardProps) {
  return (
    <article className="flex gap-4 rounded-md border border-slate-300 bg-white p-4">
      <VotingButtons upvoteCount={upvoteCount}></VotingButtons>
      <div className="mt-1 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <img
            alt={`${authorName} profile picture`}
            className="h-8 w-8 rounded-full"
            src={authorImageUrl}></img>
          <h1 className="font-bold">{authorName}</h1>
          <p className="pt-1 text-xs font-extralight">
            Posted on: {format(createdAt, 'Pp')}
          </p>
        </div>
        <p className="pl-1 pt-1">{content}</p>
      </div>
    </article>
  );
}
