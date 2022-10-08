import CommentBody from './CommentBody';
import CommentCard from './CommentCard';

import type { ResumeComment } from '~/types/resume-comments';

type CommentProps = {
  comment: ResumeComment;
  userId?: string;
};

export default function Comment({ comment, userId }: CommentProps) {
  const isCommentOwner = userId === comment.user.userId;
  return (
    <CommentCard isCommentOwner={isCommentOwner}>
      <CommentBody comment={comment} isCommentOwner={isCommentOwner} />
    </CommentCard>
  );
}
