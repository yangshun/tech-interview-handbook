import { useState } from 'react';
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { Button, HorizontalDivider, TextArea } from '@tih/ui';

import type { CommentEntity } from '~/components/offers/types';

import { timeSinceNow } from '~/utils/offers/time';

type Props = Readonly<{
  comment: CommentEntity;
  handleExpanded?: () => void;
  handleReply: (replayingToId: string, userId: string) => void;
  isExpanded?: boolean;
  replyLength?: number;
}>;

export default function CommentCard({
  comment: { createdAt, message, replyingToId, userId, username },
  handleExpanded,
  handleReply,
  isExpanded,
  replyLength = 0,
}: Props) {
  const [isReplying, setIsReplying] = useState(false);
  return (
    <>
      <div className="flex pl-2">
        <div className="flex w-full flex-col">
          <div className="flex flex-row font-bold">{username}</div>
          <div className="mt-2 mb-2 flex flex-row ">{message}</div>
          <div className="flex flex-row items-center justify-start space-x-4 ">
            <div className="flex flex-col text-sm font-light text-gray-400">{`${timeSinceNow(
              createdAt,
            )} ago`}</div>
            {replyLength > 0 && (
              <div
                className="flex cursor-pointer flex-col text-sm text-purple-600 hover:underline"
                onClick={handleExpanded}>
                {isExpanded ? `Hide replies` : `View replies (${replyLength})`}
              </div>
            )}
            <div className="flex flex-col">
              <Button
                icon={ChatBubbleBottomCenterIcon}
                isLabelHidden={true}
                label="Reply"
                size="sm"
                variant="tertiary"
                onClick={() => setIsReplying(!isReplying)}
              />
            </div>
          </div>
          {isReplying && (
            <div className="mt-2">
              <TextArea
                isLabelHidden={true}
                label="Comment"
                placeholder="Type your comment here"
                resize="none"
              />
              <div className="mt-2 flex w-full justify-end">
                <div className="w-fit">
                  <Button
                    display="block"
                    isLabelHidden={false}
                    label="Reply"
                    size="sm"
                    variant="primary"
                    onClick={() => handleReply(replyingToId, userId)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <HorizontalDivider />
    </>
  );
}
