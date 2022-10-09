import { format } from 'date-fns';

import withHref from '~/utils/questions/withHref';

import VotingButtons from '../VotingButtons';

export type AnswerCardProps = {
  authorImageUrl: string;
  authorName: string;
  content: string;
  createdAt: Date;
  upvoteCount: number;
};

function AnswerCardWithoutHref({
  authorName,
  authorImageUrl,
  upvoteCount,
  content,
  createdAt,
}: AnswerCardProps) {
  return (
    <div className="flex gap-4 rounded-md border p-2">
      <VotingButtons size="sm" upvoteCount={upvoteCount} />
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
    </div>
  );
}

const AnswerCard = withHref(AnswerCardWithoutHref);
export default AnswerCard;
