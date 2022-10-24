import { useForm } from 'react-hook-form';
import { Button, Dialog, TextInput } from '@tih/ui';

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
    formState: { isSubmitting },
    reset,
  } = useForm<CreateListFormData>();
  const register = useFormRegister(formRegister);

  const handleDialogCancel = () => {
    onCancel();
    reset();
  };

  return (
    <Dialog
      isShown={show}
      primaryButton={undefined}
      title="Create question list"
      onClose={handleDialogCancel}>
      <form
        className="mt-5 gap-2 sm:flex sm:items-center"
        onSubmit={handleSubmit(async (data) => {
          await onSubmit(data);
          reset();
        })}>
        <div className="w-full sm:max-w-xs">
          <TextInput
            id="listName"
            isLabelHidden={true}
            {...register('name')}
            autoComplete="off"
            label="Name"
            placeholder="List name"
            type="text"
          />
        </div>
        <Button
          display="inline"
          label="Cancel"
          size="md"
          variant="tertiary"
          onClick={handleDialogCancel}
        />
        <Button
          display="inline"
          isLoading={isSubmitting}
          label="Create"
          size="md"
          type="submit"
          variant="primary"
        />
      </form>
    </Dialog>
  );
}
