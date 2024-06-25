import { formatDistanceToNow } from 'date-fns';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button, Dialog, TextArea, useToast } from '~/ui';

import ProfilePhotoHolder from '~/components/offers/profile/ProfilePhotoHolder';

import { trpc } from '~/utils/trpc';

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
  replyLength = 0,
  token = '',
}: Props) {
  const { data: session, status } = useSession();
  const [isReplying, setIsReplying] = useState(false);
  const [currentReply, setCurrentReply] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { showToast } = useToast();
  const deletable: boolean = token.length > 0 || user?.id === session?.user?.id;

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
      // If not the OP and not logged in, direct users to sign in
      signIn();
    }
  }

  const deleteCommentMutation = trpc.useMutation(['offers.comments.delete'], {
    onSuccess() {
      trpcContext.invalidateQueries([
        'offers.comments.getComments',
        { profileId },
      ]);
    },
  });
  function handleDelete() {
    deleteCommentMutation.mutate(
      {
        id,
        profileId,
        token,
        userId: session?.user?.id,
      },
      {
        onError: () => {
          showToast({ title: `Server Error`, variant: 'failure' });
        },
        onSuccess: () => {
          showToast({ title: `Deleted comment`, variant: 'success' });
        },
      },
    );
  }

  return (
    <div className="flex space-x-3">
      <div className="flex-shrink-0">
        {user?.image ? (
          <img
            alt={user?.name ?? user?.email ?? 'Unknown user'}
            className="h-10 w-10 rounded-full"
            src={user?.image}
          />
        ) : (
          <ProfilePhotoHolder size="xs" />
        )}
      </div>
      <div className="w-full">
        <div className="flex flex-row items-center space-x-2">
          <p className="text-sm font-medium text-slate-900">
            {user?.name ?? 'Unknown user'}
          </p>
          <span className="font-medium text-slate-500">&middot;</span>
          <div className="text-xs text-slate-500">
            {formatDistanceToNow(createdAt, {
              addSuffix: true,
            })}
          </div>
        </div>
        <div className="mt-1 text-sm text-slate-700">
          <p className="break-all">{message}</p>
        </div>
        <div className="-ml-2 mt-1 flex h-6 items-center text-xs">
          {!disableReply && (
            <button
              className="-my-1 rounded-md px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-600"
              type="button"
              onClick={() => setIsReplying(!isReplying)}>
              Reply
            </button>
          )}
          {replyLength > 0 && (
            <button
              className="-my-1 rounded-md px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-600"
              type="button"
              onClick={handleExpanded}>
              {isExpanded
                ? `Hide ${replyLength === 1 ? 'reply' : 'replies'}`
                : `Show ${replyLength} ${
                    replyLength === 1 ? 'reply' : 'replies'
                  }`}
            </button>
          )}
          {deletable && (
            <>
              <button
                className="-my-1 rounded-md px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-600"
                disabled={deleteCommentMutation.isLoading}
                type="button"
                onClick={() => setIsDialogOpen(true)}>
                {deleteCommentMutation.isLoading ? 'Deleting...' : 'Delete'}
              </button>
              {isDialogOpen && (
                <Dialog
                  isShown={isDialogOpen}
                  primaryButton={
                    <Button
                      display="block"
                      label="Delete"
                      variant="primary"
                      onClick={() => {
                        setIsDialogOpen(false);
                        handleDelete();
                      }}
                    />
                  }
                  secondaryButton={
                    <Button
                      display="block"
                      label="Cancel"
                      variant="tertiary"
                      onClick={() => setIsDialogOpen(false)}
                    />
                  }
                  title="Are you sure you want to delete this comment?"
                  onClose={() => setIsDialogOpen(false)}>
                  <div>You cannot undo this operation.</div>
                </Dialog>
              )}
            </>
          )}
        </div>
        {!disableReply && isReplying && (
          <div className="mt-2">
            <form
              className="space-y-2"
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                handleReply();
              }}>
              <TextArea
                autoFocus={true}
                isLabelHidden={true}
                label="Reply to comment"
                placeholder="Type your reply here"
                resize="none"
                value={currentReply}
                onChange={(value) => setCurrentReply(value)}
              />
              <div className="flex w-full justify-end space-x-2">
                <Button
                  disabled={createCommentMutation.isLoading}
                  label="Cancel"
                  size="sm"
                  variant="tertiary"
                  onClick={() => {
                    setIsReplying(false);
                  }}
                />
                <Button
                  disabled={
                    !currentReply.length ||
                    createCommentMutation.isLoading ||
                    deleteCommentMutation.isLoading
                  }
                  isLabelHidden={false}
                  isLoading={createCommentMutation.isLoading}
                  label="Submit"
                  size="sm"
                  variant="primary"
                  onClick={handleReply}
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
