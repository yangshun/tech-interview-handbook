import { Button, Dialog } from '@tih/ui';
type ResumeCommentDeleteFormProps = Readonly<{
  isDeletingComment: boolean;
  setIsDeletingComment: (value: boolean) => void;
}>;

export default function ResumeCommentDeleteForm({
  isDeletingComment,
  setIsDeletingComment,
}: ResumeCommentDeleteFormProps) {
  const onDelete = () => {
    setIsDeletingComment(false);
  };

  const onCancel = () => {
    setIsDeletingComment(false);
  };

  return (
    <Dialog
      isShown={isDeletingComment}
      primaryButton={
        <Button
          display="block"
          label="Delete"
          variant="danger"
          onClick={onDelete}
        />
      }
      secondaryButton={
        <Button
          display="block"
          label="Cancel"
          variant="tertiary"
          onClick={onCancel}
        />
      }
      title="Are you sure?"
      onClose={() => setIsDeletingComment(false)}>
      <div>Note that this is irreversible!</div>
    </Dialog>
  );
}
