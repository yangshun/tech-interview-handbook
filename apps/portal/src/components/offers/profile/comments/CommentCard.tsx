import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { Button } from '@tih/ui';

import type { CommentEntity } from '~/components/offers/types';

import { timeSinceNow } from '~/utils/offers/time';

type Props = Readonly<{
  comment: CommentEntity;
  handleReply: (replayingToId: string, userId: string) => void;
}>;

export default function CommentCard({
  comment: {
    createdAt,
    message,
    // ProfileId,
    // replies,
    replyingToId,
    userId,
    username,
  },
  handleReply,
}: Props) {
  return (
    <div className="flex pl-4">
      <div className="flex flex-col">
        <div className="flex flex-row font-bold">{username}</div>
        <div className="mt-2 mb-2 flex flex-row ">{message}</div>
        <div className="flex flex-row items-center justify-end space-x-4 ">
          <div className="flex flex-col text-sm font-light text-gray-400">{`${timeSinceNow(
            createdAt,
          )} ago`}</div>
          <div className="flex flex-col">
            <Button
              //   Disabled={isLoading}
              icon={ChatBubbleBottomCenterIcon}
              isLabelHidden={true}
              label="Reply"
              size="sm"
              variant="tertiary"
              onClick={() => handleReply(replyingToId, userId)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
