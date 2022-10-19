import { useState } from 'react';

import CommentCard from '~/components/offers/profile/comments/CommentCard';

import type { Reply } from '~/types/offers';

type Props = Readonly<{
  comment: Reply;
  // HandleReply?: (message: string, replyingToId: string) => void;
  // isLoading?: boolean;
  profileId: string;
  token?: string;
}>;

export default function ExpandableCommentCard({
  comment,
  profileId,
  token = '',
}: // HandleReply,
// isLoading,
Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <CommentCard
        comment={comment}
        handleExpanded={() => setIsExpanded(!isExpanded)}
        // HandleReply={handleReply}
        isExpanded={isExpanded}
        profileId={profileId}
        replyLength={comment.replies?.length ?? 0}
        // IsLoading={isLoading}
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
                profileId={profileId} // IsLoading={isLoading}
              />
            ))}
        </div>
      )}
    </div>
  );
}
