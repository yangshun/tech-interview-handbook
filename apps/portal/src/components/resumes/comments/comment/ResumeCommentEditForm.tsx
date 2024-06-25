import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Button, TextArea } from '~/ui';

import { trpc } from '~/utils/trpc';

import type { ResumeComment } from '~/types/resume-comments';

type ResumeCommentEditFormProps = {
  comment: ResumeComment;
  setIsEditingComment: (value: boolean) => void;
};

type ICommentInput = {
  description: string;
};

export default function ResumeCommentEditForm({
  comment,
  setIsEditingComment,
}: ResumeCommentEditFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
    reset,
  } = useForm<ICommentInput>({
    defaultValues: {
      description: comment.description,
    },
  });

  const trpcContext = trpc.useContext();
  const commentUpdateMutation = trpc.useMutation(
    'resumes.comments.user.update',
    {
      onSuccess: () => {
        // Comment updated, invalidate query to trigger refetch
        trpcContext.invalidateQueries(['resumes.comments.list']);
      },
    },
  );

  const onCancel = () => {
    reset({ description: comment.description });
    setIsEditingComment(false);
  };

  const onSubmit: SubmitHandler<ICommentInput> = async (data) => {
    const { id } = comment;
    return commentUpdateMutation.mutate(
      {
        id,
        ...data,
      },
      {
        onSuccess: () => {
          setIsEditingComment(false);
        },
      },
    );
  };

  const setFormValue = (value: string) => {
    setValue('description', value.trim(), { shouldDirty: true });
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <TextArea
        {...(register('description', {
          required: 'Comments cannot be empty!',
        }),
        {})}
        defaultValue={comment.description}
        disabled={commentUpdateMutation.isLoading}
        errorMessage={errors.description?.message}
        label=""
        placeholder="Leave your comment here"
        onChange={setFormValue}
      />
      <div className="flex w-full justify-end space-x-2">
        <Button
          disabled={commentUpdateMutation.isLoading}
          label="Cancel"
          size="sm"
          variant="tertiary"
          onClick={onCancel}
        />
        <Button
          disabled={!isDirty || commentUpdateMutation.isLoading}
          isLoading={commentUpdateMutation.isLoading}
          label="Submit"
          size="sm"
          type="submit"
          variant="primary"
        />
      </div>
    </form>
  );
}
