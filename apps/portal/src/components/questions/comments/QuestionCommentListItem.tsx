import useQuestionCommentVote from '~/utils/questions/vote/useQuestionCommentVote';

import type { CommentListItemProps } from './CommentListItem';
import CommentListItem from './CommentListItem';

export type QuestionCommentListItemProps = Omit<
  CommentListItemProps,
  'onDownvote' | 'onUpvote' | 'vote'
> & {
  questionCommentId: string;
};

export default function QuestionCommentListItem({
  questionCommentId,
  ...restProps
}: QuestionCommentListItemProps) {
  const { handleDownvote, handleUpvote, vote } =
    useQuestionCommentVote(questionCommentId);

  return (
    <CommentListItem
      vote={vote}
      onDownvote={handleDownvote}
      onUpvote={handleUpvote}
      {...restProps}
    />
  );
}
