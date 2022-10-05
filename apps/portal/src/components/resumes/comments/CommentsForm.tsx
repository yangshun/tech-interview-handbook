import type { FormEvent } from 'react';
import { useRef, useState } from 'react';
import { Button, Dialog, TextInput } from '@tih/ui';

import { COMMENTS_SECTIONS } from './constants';

type CommentsFormProps = Readonly<{
  setShowCommentsForm: (show: boolean) => void;
}>;

export default function CommentsForm({
  setShowCommentsForm,
}: CommentsFormProps) {
  const [showDialog, setShowDialog] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  // TODO: Implement form validation. Disable Submit button until one input field is filled up
  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);

    COMMENTS_SECTIONS.forEach(({ value }) => {
      const comment = (formData.get(value) as string | null)?.trim();

      if (!comment) {
        return;
      }

      // TODO: Store comment in database & handle errors
      /* eslint-disable no-console */
      console.log(`Storing ${value} comment ${comment} in database`);
      /* eslint-enable no-console */
    });

    // TODO: Handle form submission success
    // Show alert & goto CommentsList
  };

  // TODO: Form validation
  // If form is empty, goto CommentsList
  // If form not empty, show dialog
  const onCancel = () => {
    setShowDialog(true);
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800">Add your review</h2>

      <form
        ref={formRef}
        className="w-full space-y-8 divide-y divide-gray-200"
        onSubmit={onFormSubmit}>
        {/* TODO: Convert TextInput to TextArea */}
        <div className="mt-4 space-y-4">
          {COMMENTS_SECTIONS.map(({ label, value, placeholder }) => {
            return (
              <TextInput
                key={value}
                id={value}
                label={label}
                name={value}
                placeholder={placeholder}
                type="text"
              />
            );
          })}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            label="Cancel"
            type="button"
            variant="tertiary"
            onClick={onCancel}
          />

          <Button label="Submit" type="submit" variant="primary" />
        </div>
      </form>

      <Dialog
        isShown={showDialog}
        primaryButton={
          <Button
            display="block"
            label="OK"
            variant="primary"
            onClick={() => setShowCommentsForm(false)}
          />
        }
        secondaryButton={
          <Button
            display="block"
            label="Cancel"
            variant="tertiary"
            onClick={() => setShowDialog(false)}
          />
        }
        title="Are you sure you want to leave?"
        onClose={() => {
          setShowDialog(false);
        }}>
        <div>Note that your review will not be saved!</div>
      </Dialog>
    </>
  );
}
