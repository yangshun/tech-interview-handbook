import { useState } from 'react';

import CommentCard from '~/components/offers/profile/comments/CommentCard';
import type { CommentEntity } from '~/components/offers/types';

type Props = Readonly<{
  comment: CommentEntity;
  handleReply: (replayingToId: string, userId: string) => void;
}>;

export default function ExpandableCommentCard({ comment, handleReply }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <CommentCard
        comment={comment}
        handleExpanded={() => setIsExpanded(!isExpanded)}
        handleReply={handleReply}
        isExpanded={isExpanded}
        replyLength={comment.replies?.length ?? 0}
      />
      {comment.replies && (
        <div className="pl-8">
          {isExpanded &&
            comment.replies.map((reply) => (
              <CommentCard
                key={reply.id}
                comment={reply}
                handleReply={handleReply}
              />
            ))}
        </div>
      )}
    </div>
  );
}
