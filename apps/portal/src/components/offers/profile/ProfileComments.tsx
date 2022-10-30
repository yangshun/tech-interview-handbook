import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { ClipboardDocumentIcon, ShareIcon } from '@heroicons/react/24/outline';
import {
  Button,
  HorizontalDivider,
  Spinner,
  TextArea,
  useToast,
} from '@tih/ui';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';
import ExpandableCommentCard from '~/components/offers/profile/comments/ExpandableCommentCard';
import Tooltip from '~/components/offers/util/Tooltip';

import { copyProfileLink } from '~/utils/offers/link';
import { trpc } from '~/utils/trpc';

import type { OffersDiscussion, Reply } from '~/types/offers';

import 'react-popper-tooltip/dist/styles.css';

type ProfileHeaderProps = Readonly<{
  isDisabled: boolean;
  isEditable: boolean;
  isLoading: boolean;
  profileId: string;
  profileName?: string;
  token?: string;
}>;

export default function ProfileComments({
  isDisabled,
  isEditable,
  isLoading,
  profileId,
  profileName,
  token,
}: ProfileHeaderProps) {
  const { data: session, status } = useSession();
  const [currentReply, setCurrentReply] = useState<string>('');
  const [replies, setReplies] = useState<Array<Reply>>();
  const { showToast } = useToast();
  const { event: gaEvent } = useGoogleAnalytics();

  const commentsQuery = trpc.useQuery(
    ['offers.comments.getComments', { profileId }],
    {
      onSuccess(response: OffersDiscussion) {
        setReplies(response.data);
      },
    },
  );

  const trpcContext = trpc.useContext();
  const createCommentMutation = trpc.useMutation(['offers.comments.create'], {
    onSuccess() {
      trpcContext.invalidateQueries([
        'offers.comments.getComments',
        { profileId },
      ]);
    },
  });

  function handleComment(message: string) {
    if (!currentReply.length) {
      return;
    }

    if (isEditable) {
      // If it is with edit permission, send comment to API with username = null
      createCommentMutation.mutate(
        {
          message,
          profileId,
          token,
        },
        {
          onSuccess: () => {
            setCurrentReply('');
          },
        },
      );
    } else if (status === 'authenticated') {
      // If not the OP and logged in, send comment to API
      createCommentMutation.mutate(
        {
          message,
          profileId,
          userId: session.user?.id,
        },
        {
          onSuccess: () => {
            setCurrentReply('');
          },
        },
      );
    } else {
      // If not the OP and not logged in, direct users to log in
      signIn();
    }
  }

  if (isLoading) {
    return (
      <div className="col-span-10 pt-4">
        <Spinner display="block" size="lg" />
      </div>
    );
  }
  return (
    <div className="m-4 h-full">
      <div className="flex-end flex justify-end space-x-4">
        {isEditable && (
          <Tooltip tooltipContent="Copy this link to edit your profile later">
            <Button
              addonPosition="start"
              disabled={isDisabled}
              icon={ClipboardDocumentIcon}
              isLabelHidden={false}
              label="Copy profile edit link"
              size="sm"
              variant="secondary"
              onClick={() => {
                copyProfileLink(profileId, token);
                gaEvent({
                  action: 'offers.copy_profile_edit_link',
                  category: 'engagement',
                  label: 'Copy Profile Edit Link',
                });
                showToast({
                  title: `Profile edit link copied to clipboard!`,
                  variant: 'success',
                });
              }}
            />
          </Tooltip>
        )}
        <Tooltip tooltipContent="Share this profile with your friends">
          <Button
            addonPosition="start"
            disabled={isDisabled}
            icon={ShareIcon}
            isLabelHidden={false}
            label="Copy public link"
            size="sm"
            variant="secondary"
            onClick={() => {
              copyProfileLink(profileId);
              gaEvent({
                action: 'offers.copy_profile_public_link',
                category: 'engagement',
                label: 'Copy Profile Public Link',
              });
              showToast({
                title: `Public profile link copied to clipboard!`,
                variant: 'success',
              });
            }}
          />
        </Tooltip>
      </div>
      <h2 className="mt-2 mb-6 text-2xl font-bold">Discussions</h2>
      {isEditable || session?.user?.name ? (
        <div>
          <TextArea
            label={`Comment as ${
              isEditable ? profileName : session?.user?.name ?? 'anonymous'
            }`}
            placeholder="Type your comment here"
            value={currentReply}
            onChange={(value) => setCurrentReply(value)}
          />
          <div className="mt-2 flex w-full justify-end">
            <div className="w-fit">
              <Button
                disabled={
                  commentsQuery.isLoading ||
                  !currentReply.length ||
                  createCommentMutation.isLoading
                }
                display="block"
                isLabelHidden={false}
                isLoading={createCommentMutation.isLoading}
                label="Comment"
                size="sm"
                variant="primary"
                onClick={() => handleComment(currentReply)}
              />
            </div>
          </div>
          <HorizontalDivider />
        </div>
      ) : (
        <Button
          className="mb-5"
          display="block"
          href="/api/auth/signin"
          label="Sign in to join discussion"
          variant="tertiary"
        />
      )}
      <div className="h-full overflow-y-auto">
        <div className="h-content mb-96 w-full">
          {replies?.map((reply: Reply) => (
            <ExpandableCommentCard
              key={reply.id}
              comment={reply}
              profileId={profileId}
              token={isEditable ? token : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
