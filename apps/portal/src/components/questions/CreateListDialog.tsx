import { useForm } from 'react-hook-form';
import { Button, Dialog, TextInput } from '~/ui';

import { useFormRegister } from '~/utils/questions/useFormRegister';

export type CreateListFormData = {
  name: string;
};

export type CreateListDialogProps = {
  onCancel: () => void;
  onSubmit: (data: CreateListFormData) => Promise<void>;
  show: boolean;
};

export default function CreateListDialog({
  show,
  onCancel,
  onSubmit,
}: CreateListDialogProps) {
  const {
    register: formRegister,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
  } = useForm<CreateListFormData>();
  const register = useFormRegister(formRegister);

  const handleDialogCancel = () => {
    onCancel();
    reset();
  };

  const handleFormSubmit = handleSubmit(async (data) => {
    await onSubmit(data);
    reset();
  });

  return (
    <Dialog
      isShown={show}
      primaryButton={
        <Button
          disabled={!isDirty}
          display="inline"
          isLoading={isSubmitting}
          label="Create"
          size="md"
          type="submit"
          variant="primary"
          onClick={handleFormSubmit}
        />
      }
      secondaryButton={
        <Button
          display="inline"
          label="Cancel"
          size="md"
          variant="tertiary"
          onClick={handleDialogCancel}
        />
      }
      title="Create question list"
      onClose={handleDialogCancel}>
      <form className="w-full" onSubmit={handleFormSubmit}>
        <TextInput
          id="listName"
          isLabelHidden={true}
          {...register('name')}
          autoComplete="off"
          label="Name"
          placeholder="List name"
          required={true}
          type="text"
        />
      </form>
    </Dialog>
  );
}
