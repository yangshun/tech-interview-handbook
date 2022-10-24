import { Button, Dialog } from '@tih/ui';

export type CreateListDialogProps = {
  onCancel: () => void;
  onCreate: () => void;
  show: boolean;
};

export default function CreateListDialog({
  show,
  onCancel,
  onCreate,
}: CreateListDialogProps) {
  return (
    <Dialog
      isShown={show}
      primaryButton={undefined}
      title="Create a new question list"
      onClose={onCancel}>
      <form className="mt-5 gap-2 sm:flex sm:items-center">
        <div className="w-full sm:max-w-xs">
          <input
            className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-slate-300 shadow-sm sm:text-sm"
            id="listName"
            name="listName"
            placeholder="Enter list name"
            type="text"
          />
        </div>
        <Button
          display="inline"
          label="Cancel"
          size="md"
          type="submit"
          variant="tertiary"
          onClick={onCancel}></Button>

        <Button
          display="inline"
          label="Create"
          size="md"
          type="submit"
          variant="primary"
          onClick={onCreate}></Button>
      </form>
    </Dialog>
  );
}
