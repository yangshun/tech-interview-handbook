import { signIn } from 'next-auth/react';
import { Button, Dialog } from '~/ui';

export type ProtectedDialogProps = {
  onClose: () => void;
  show: boolean;
};

export default function ProtectedDialog({
  show,
  onClose,
}: ProtectedDialogProps) {
  const handlePrimaryClick = () => {
    signIn();
    onClose();
  };

  return (
    <Dialog
      isShown={show}
      primaryButton={
        <Button
          label="Sign in"
          variant="primary"
          onClick={handlePrimaryClick}
        />
      }
      secondaryButton={
        <Button label="Cancel" variant="tertiary" onClick={onClose} />
      }
      title="Sign in to continue"
      onClose={onClose}>
      <p>This action requires you to be signed in.</p>
    </Dialog>
  );
}
