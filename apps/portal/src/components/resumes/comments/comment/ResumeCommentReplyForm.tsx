import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { ResumesSection } from '@prisma/client';
import { Button, TextArea } from '~/ui';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';

import { trpc } from '~/utils/trpc';

type ResumeCommentEditFormProps = {
  parentId: string;
  resumeId: string;
  section: ResumesSection;
  setIsReplyingComment: (value: boolean) => void;
};

type IReplyInput = {
  description: string;
};

export default function ResumeCommentReplyForm({
  parentId,
  setIsReplyingComment,
  resumeId,
  section,
}: ResumeCommentEditFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
    reset,
  } = useForm<IReplyInput>({
    defaultValues: {
      description: '',
    },
  });
  const { event: gaEvent } = useGoogleAnalytics();

  const trpcContext = trpc.useContext();
  const commentReplyMutation = trpc.useMutation('resumes.comments.user.reply', {
    onSuccess: () => {
      // Comment updated, invalidate query to trigger refetch
      trpcContext.invalidateQueries(['resumes.comments.list']);
    },
  });

  const onCancel = () => {
    reset({ description: '' });
    setIsReplyingComment(false);
  };

  const onSubmit: SubmitHandler<IReplyInput> = async (data) => {
    return commentReplyMutation.mutate(
      {
        parentId,
        resumeId,
        section,
        ...data,
      },
      {
        onSuccess: () => {
          setIsReplyingComment(false);

          gaEvent({
            action: 'resumes.comment_reply',
            category: 'engagement',
            label: 'Reply comment',
          });
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
          required: 'Reply cannot be empty!',
        }),
        {})}
        autoFocus={true}
        defaultValue=""
        disabled={commentReplyMutation.isLoading}
        errorMessage={errors.description?.message}
        isLabelHidden={true}
        label="Reply to comment"
        placeholder="Type your reply here"
        onChange={setFormValue}
      />
      <div className="flex w-full justify-end space-x-2">
        <Button
          disabled={commentReplyMutation.isLoading}
          label="Cancel"
          size="sm"
          variant="tertiary"
          onClick={onCancel}
        />
        <Button
          disabled={!isDirty || commentReplyMutation.isLoading}
          isLoading={commentReplyMutation.isLoading}
          label="Submit"
          size="sm"
          type="submit"
          variant="primary"
        />
      </div>
    </form>
  );
}
