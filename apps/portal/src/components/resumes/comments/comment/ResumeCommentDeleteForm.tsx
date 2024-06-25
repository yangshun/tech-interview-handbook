import { Button, Dialog } from '~/ui';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';

import { trpc } from '~/utils/trpc';
type ResumeCommentDeleteFormProps = Readonly<{
  id: string;
  isDeletingComment: boolean;
  setIsDeletingComment: (value: boolean) => void;
}>;

export default function ResumeCommentDeleteForm({
  id,
  isDeletingComment,
  setIsDeletingComment,
}: ResumeCommentDeleteFormProps) {
  const { event: gaEvent } = useGoogleAnalytics();

  const trpcContext = trpc.useContext();
  const commentDeleteMutation = trpc.useMutation(
    'resumes.comments.user.delete',
    {
      onSuccess: () => {
        // Comments updated, invalidate query to trigger refetch
        trpcContext.invalidateQueries(['resumes.comments.list']);
      },
    },
  );

  const onDelete = async () => {
    return commentDeleteMutation.mutate(
      {
        id,
      },
      {
        onSuccess: () => {
          setIsDeletingComment(false);

          gaEvent({
            action: 'resumes.comment_delete',
            category: 'engagement',
            label: 'Delete comment',
          });
        },
      },
    );
  };

  const onCancel = () => {
    setIsDeletingComment(false);
  };

  return (
    <Dialog
      isShown={isDeletingComment}
      primaryButton={
        <Button
          disabled={commentDeleteMutation.isLoading}
          display="block"
          isLoading={commentDeleteMutation.isLoading}
          label="Delete"
          variant="danger"
          onClick={onDelete}
        />
      }
      secondaryButton={
        <Button
          disabled={commentDeleteMutation.isLoading}
          display="block"
          label="Cancel"
          variant="tertiary"
          onClick={onCancel}
        />
      }
      title="Are you sure?"
      onClose={() => setIsDeletingComment(false)}>
      <div>
        Note that deleting this comment will delete all its replies as well.
        This action is also irreversible! Please check before confirming!
      </div>
    </Dialog>
  );
}
