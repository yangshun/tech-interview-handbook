import { useState } from 'react';

import CommentCard from '~/components/offers/profile/comments/CommentCard';

import type { Reply } from '~/types/offers';

type Props = Readonly<{
  comment: Reply;
  profileId: string;
  token?: string;
}>;

export default function ExpandableCommentCard({
  comment,
  profileId,
  token = '',
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <CommentCard
        comment={comment}
        handleExpanded={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        profileId={profileId}
        replyLength={comment.replies?.length ?? 0}
        token={token}
      />
      {comment.replies && (
        <div className="pl-8">
          {isExpanded &&
            comment.replies.map((reply) => (
              <CommentCard
                key={reply.id}
                comment={reply}
                disableReply={true}
                profileId={profileId}
                token={token}
              />
            ))}
        </div>
      )}
    </div>
  );
}
