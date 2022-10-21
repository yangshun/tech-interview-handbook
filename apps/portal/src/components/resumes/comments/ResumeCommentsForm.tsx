import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Button, Dialog, TextArea } from '@tih/ui';

import { trpc } from '~/utils/trpc';

type ResumeCommentsFormProps = Readonly<{
  resumeId: string;
  setShowCommentsForm: (show: boolean) => void;
}>;

type IFormInput = {
  education: string;
  experience: string;
  general: string;
  projects: string;
  skills: string;
};

type InputKeys = keyof IFormInput;

export default function ResumeCommentsForm({
  resumeId,
  setShowCommentsForm,
}: ResumeCommentsFormProps) {
  const [showDialog, setShowDialog] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useForm<IFormInput>({
    defaultValues: {
      education: '',
      experience: '',
      general: '',
      projects: '',
      skills: '',
    },
  });

  const trpcContext = trpc.useContext();
  const commentCreateMutation = trpc.useMutation(
    'resumes.comments.user.create',
    {
      onSuccess: () => {
        // New Comment added, invalidate query to trigger refetch
        trpcContext.invalidateQueries(['resumes.comments.list']);
        trpcContext.invalidateQueries(['resumes.resume.findAll']);
        trpcContext.invalidateQueries(['resumes.resume.user.findUserStarred']);
        trpcContext.invalidateQueries(['resumes.resume.user.findUserCreated']);
      },
    },
  );

  // TODO: Give a feedback to the user if the action succeeds/fails
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    return await commentCreateMutation.mutate(
      {
        resumeId,
        ...data,
      },
      {
        onSuccess: () => {
          // Redirect back to comments section
          setShowCommentsForm(false);
        },
      },
    );
  };

  const onCancel = () => {
    if (isDirty) {
      setShowDialog(true);
    } else {
      setShowCommentsForm(false);
    }
  };

  const onValueChange = (section: InputKeys, value: string) => {
    setValue(section, value.trim(), { shouldDirty: true });
  };

  return (
    <div className="h-[calc(100vh-13rem)] overflow-y-auto">
      <h2 className="text-xl font-semibold text-gray-800">Add your review</h2>
      <p className="text-gray-800">
        Please fill in at least one section to submit your review
      </p>

      <form
        className="w-full space-y-8 divide-y divide-gray-200"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 space-y-4">
          <TextArea
            {...(register('general'), {})}
            disabled={commentCreateMutation.isLoading}
            label="General"
            placeholder="General comments about the resume"
            onChange={(value) => onValueChange('general', value)}
          />

          <TextArea
            {...(register('education'), {})}
            disabled={commentCreateMutation.isLoading}
            label="Education"
            placeholder="Comments about the Education section"
            onChange={(value) => onValueChange('education', value)}
          />

          <TextArea
            {...(register('experience'), {})}
            disabled={commentCreateMutation.isLoading}
            label="Experience"
            placeholder="Comments about the Experience section"
            onChange={(value) => onValueChange('experience', value)}
          />

          <TextArea
            {...(register('projects'), {})}
            disabled={commentCreateMutation.isLoading}
            label="Projects"
            placeholder="Comments about the Projects section"
            onChange={(value) => onValueChange('projects', value)}
          />

          <TextArea
            {...(register('skills'), {})}
            disabled={commentCreateMutation.isLoading}
            label="Skills"
            placeholder="Comments about the Skills section"
            onChange={(value) => onValueChange('skills', value)}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            disabled={commentCreateMutation.isLoading}
            label="Cancel"
            type="button"
            variant="tertiary"
            onClick={onCancel}
          />

          <Button
            disabled={!isDirty || commentCreateMutation.isLoading}
            isLoading={commentCreateMutation.isLoading}
            label="Submit"
            type="submit"
            variant="primary"
          />
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
    </div>
  );
}
