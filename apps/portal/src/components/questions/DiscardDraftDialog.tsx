import { Button, Dialog } from '~/ui';

export type DiscardDraftDialogProps = {
  onCancel: () => void;
  onDiscard: () => void;
  show: boolean;
};
export default function DiscardDraftDialog({
  show,
  onCancel,
  onDiscard,
}: DiscardDraftDialogProps) {
  return (
    <Dialog
      isShown={show}
      primaryButton={
        <Button label="Discard" variant="primary" onClick={onDiscard} />
      }
      secondaryButton={
        <Button label="Cancel" variant="tertiary" onClick={onCancel} />
      }
      title="Discard draft"
      onClose={onCancel}>
      <p>
        Are you sure you want to discard the current draft? This action cannot
        be undone.
      </p>
    </Dialog>
  );
}
