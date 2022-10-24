import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { Button, HorizontalDivider, TextArea } from '@tih/ui';

import { timeSinceNow } from '~/utils/offers/time';

import { trpc } from '../../../../utils/trpc';

import type { Reply } from '~/types/offers';

type Props = Readonly<{
  comment: Reply;
  disableReply?: boolean;
  handleExpanded?: () => void;
  isExpanded?: boolean;
  profileId: string;
  replyLength?: number;
  token?: string;
}>;

export default function CommentCard({
  comment: { createdAt, id, message, user },
  disableReply,
  handleExpanded,
  isExpanded,
  profileId,
  token = '',
  replyLength = 0,
}: Props) {
  const { data: session, status } = useSession();
  const [isReplying, setIsReplying] = useState(false);
  const [currentReply, setCurrentReply] = useState<string>('');

  const trpcContext = trpc.useContext();
  const createCommentMutation = trpc.useMutation(['offers.comments.create'], {
    onSuccess() {
      trpcContext.invalidateQueries([
        'offers.comments.getComments',
        { profileId },
      ]);
    },
  });

  function handleReply() {
    if (!currentReply.length) {
      return;
    }

    if (token && token.length > 0) {
      // If it is with edit permission, send comment to API with username = null
      createCommentMutation.mutate(
        {
          message: currentReply,
          profileId,
          replyingToId: id,
          token,
        },
        {
          onSuccess: () => {
            setCurrentReply('');
            setIsReplying(false);
            if (!isExpanded) {
              handleExpanded?.();
            }
          },
        },
      );
    } else if (status === 'authenticated') {
      // If not the OP and logged in, send comment to API
      createCommentMutation.mutate(
        {
          message: currentReply,
          profileId,
          replyingToId: id,
          userId: session.user?.id,
        },
        {
          onSuccess: () => {
            setCurrentReply('');
            setIsReplying(false);
            if (!isExpanded) {
              handleExpanded?.();
            }
          },
        },
      );
    } else {
      // If not the OP and not logged in, direct users to log in
      signIn();
    }
  }

  return (
    <>
      <div className="flex pl-2">
        <div className="flex w-full flex-col">
          <div className="flex flex-row font-bold">
            {user?.name ?? 'unknown user'}
          </div>
          <div className="mt-2 mb-2 flex flex-row ">{message}</div>
          <div className="flex flex-row items-center justify-start space-x-4 ">
            <div className="flex flex-col text-sm font-light text-slate-400">{`${timeSinceNow(
              createdAt,
            )} ago`}</div>
            {replyLength > 0 && (
              <div
                className="text-primary-600 flex cursor-pointer flex-col text-sm hover:underline"
                onClick={handleExpanded}>
                {isExpanded ? `Hide replies` : `View replies (${replyLength})`}
              </div>
            )}
            {!disableReply && (
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
            )}
          </div>
          {!disableReply && isReplying && (
            <div className="mt-2 mr-2">
              <TextArea
                isLabelHidden={true}
                label="Comment"
                placeholder="Type your comment here"
                resize="none"
                value={currentReply}
                onChange={(value) => setCurrentReply(value)}
              />
              <div className="mt-2 flex w-full justify-end">
                <div className="w-fit">
                  <Button
                    disabled={!currentReply.length}
                    display="block"
                    isLabelHidden={false}
                    isLoading={createCommentMutation.isLoading}
                    label="Reply"
                    size="sm"
                    variant="primary"
                    onClick={handleReply}
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
