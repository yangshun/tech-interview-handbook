import useAnswerCommentVote from '~/utils/questions/vote/useAnswerCommentVote';

import type { CommentListItemProps } from './CommentListItem';
import CommentListItem from './CommentListItem';

export type AnswerCommentListItemProps = Omit<
  CommentListItemProps,
  'onDownvote' | 'onUpvote' | 'vote'
> & {
  answerCommentId: string;
};

export default function AnswerCommentListItem({
  answerCommentId,
  ...restProps
}: AnswerCommentListItemProps) {
  const { handleDownvote, handleUpvote, vote } =
    useAnswerCommentVote(answerCommentId);

  return (
    <CommentListItem
      vote={vote}
      onDownvote={handleDownvote}
      onUpvote={handleUpvote}
      {...restProps}
    />
  );
}
