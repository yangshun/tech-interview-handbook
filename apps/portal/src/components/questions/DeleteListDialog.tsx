import { Button, Dialog } from '~/ui';

export type DeleteListDialogProps = {
  onCancel: () => void;
  onDelete: () => void;
  show: boolean;
};
export default function DeleteListDialog({
  show,
  onCancel,
  onDelete,
}: DeleteListDialogProps) {
  return (
    <Dialog
      isShown={show}
      primaryButton={
        <Button label="Delete" variant="primary" onClick={onDelete} />
      }
      secondaryButton={
        <Button label="Cancel" variant="tertiary" onClick={onCancel} />
      }
      title="Delete List"
      onClose={onCancel}>
      <p>
        Are you sure you want to delete this list? This action cannot be undone.
      </p>
    </Dialog>
  );
}
