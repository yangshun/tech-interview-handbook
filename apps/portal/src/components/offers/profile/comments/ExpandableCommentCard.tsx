import { Collapsible } from '@tih/ui';

import CommentCard from '~/components/offers/profile/comments/CommentCard';
import type { CommentEntity } from '~/components/offers/types';

type Props = Readonly<{
  comment: CommentEntity;
  handleReply: (replayingToId: string, userId: string) => void;
}>;

export default function ExpandableCommentCard({ comment, handleReply }: Props) {
  return (
    <div>
      <CommentCard comment={comment} handleReply={handleReply} />
      {comment.replies && (
        <div className="pl-4">
          <Collapsible label={`View more replies(${comment.replies.length})`}>
            {comment.replies.map((reply) => (
              <CommentCard
                key={reply.id}
                comment={reply}
                handleReply={handleReply}
              />
            ))}
          </Collapsible>
        </div>
      )}
    </div>
  );
}
