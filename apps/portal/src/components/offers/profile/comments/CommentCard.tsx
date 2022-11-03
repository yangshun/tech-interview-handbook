import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button, Dialog, TextArea, useToast } from '@tih/ui';

import { timeSinceNow } from '~/utils/offers/time';
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
      // If not the OP and not logged in, direct users to log in
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
      {/* <div className="flex-shrink-0">
        <img
          alt=""
          className="h-10 w-10 rounded-full"
          src={`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
        />
      </div> */}
      <div>
        <div className="text-sm">
          <p className="font-medium text-slate-900">
            {user?.name ?? 'unknown user'}
          </p>
        </div>
        <div className="mt-1 text-sm text-slate-700">
          <p className="break-all">{message}</p>
        </div>
        <div className="mt-2 space-x-2 text-sm">
          <span className="font-medium text-slate-500">
            {timeSinceNow(createdAt)} ago
          </span>{' '}
          <span className="font-medium text-slate-500">&middot;</span>{' '}
          {replyLength > 0 && (
            <>
              <button
                className="font-medium text-slate-900"
                type="button"
                onClick={handleExpanded}>
                {isExpanded ? `Hide replies` : `View replies (${replyLength})`}
              </button>
              <span className="font-medium text-slate-500">&middot;</span>{' '}
            </>
          )}
          {!disableReply && (
            <>
              <button
                className="font-medium text-slate-900"
                type="button"
                onClick={() => setIsReplying(!isReplying)}>
                Reply
              </button>
              <span className="font-medium text-slate-500">&middot;</span>{' '}
            </>
          )}
          {deletable && (
            <>
              <button
                className="font-medium text-slate-900"
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
          <div className="mt-2 mr-2">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                handleReply();
              }}>
              <TextArea
                isLabelHidden={true}
                label="Comment"
                placeholder="Type your reply here"
                resize="none"
                value={currentReply}
                onChange={(value) => setCurrentReply(value)}
              />
              <div className="mt-2 flex w-full justify-end">
                <div className="w-fit">
                  <Button
                    disabled={
                      !currentReply.length ||
                      createCommentMutation.isLoading ||
                      deleteCommentMutation.isLoading
                    }
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
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
