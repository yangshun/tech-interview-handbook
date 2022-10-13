import ResumeCommentBody from './ResumeCommentBody';
import ResumeCommentCard from './ResumeCommentCard';

import type { ResumeComment } from '~/types/resume-comments';

type ResumeCommentListItemProps = {
  comment: ResumeComment;
  userId?: string;
};

export default function ResumeCommentListItem({
  comment,
  userId,
}: ResumeCommentListItemProps) {
  const isCommentOwner = userId === comment.user.userId;
  return (
    <ResumeCommentCard>
      <ResumeCommentBody comment={comment} isCommentOwner={isCommentOwner} />
    </ResumeCommentCard>
  );
}
