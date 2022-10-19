import clsx from 'clsx';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from '@heroicons/react/20/solid';
import { FaceSmileIcon } from '@heroicons/react/24/outline';
import { Vote } from '@prisma/client';
import { Button, TextArea } from '@tih/ui';

import { trpc } from '~/utils/trpc';

import ResumeExpandableText from '../shared/ResumeExpandableText';

import type { ResumeComment } from '~/types/resume-comments';

type ResumeCommentListItemProps = {
  comment: ResumeComment;
  userId: string | undefined;
};

type ICommentInput = {
  description: string;
};

export default function ResumeCommentListItem({
  comment,
  userId,
}: ResumeCommentListItemProps) {
  const isCommentOwner = userId === comment.user.userId;
  const [isEditingComment, setIsEditingComment] = useState(false);

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
  const commentUpvoteUpsertMutation = trpc.useMutation(
    'resumes.comments.upvotes.user.upsert',
    {
      onSuccess: () => {
        // Comment updated, invalidate query to trigger refetch
        trpcContext.invalidateQueries(['resumes.comments.list']);
      },
    },
  );
  const commentUpvoteDeleteMutation = trpc.useMutation(
    'resumes.comments.upvotes.user.delete',
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

  const onVote = async (value: Vote) => {
    if (comment.userVote?.value === value) {
      return commentUpvoteDeleteMutation.mutate({
        commentId: comment.id,
      });
    }
    return commentUpvoteUpsertMutation.mutate({
      commentId: comment.id,
      id: comment.userVote?.id,
      value,
    });
  };

  return (
    <div className="border-primary-300 w-11/12 min-w-fit rounded-md border-2 bg-white p-2 drop-shadow-md">
      <div className="flex flex-row space-x-2 p-1 align-top">
        {comment.user.image ? (
          <img
            alt={comment.user.name ?? 'Reviewer'}
            className="mt-1 h-8 w-8 rounded-full"
            src={comment.user.image!}
          />
        ) : (
          <FaceSmileIcon className="h-8 w-8 rounded-full" />
        )}

        <div className="flex w-full flex-col space-y-1">
          {/* Name and creation time */}
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center space-x-1">
              <div className="font-medium">
                {comment.user.name ?? 'Reviewer ABC'}
              </div>

              <div className="text-primary-800 text-xs font-medium">
                {isCommentOwner ? '(Me)' : ''}
              </div>
            </div>

            <div className="px-2 text-xs text-gray-600">
              {comment.createdAt.toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </div>
          </div>

          {/* Description */}
          {isEditingComment ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex-column mt-1 space-y-2">
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

                <div className="flex-row space-x-2">
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
                    label="Confirm"
                    size="sm"
                    type="submit"
                    variant="primary"
                  />
                </div>
              </div>
            </form>
          ) : (
            <ResumeExpandableText text={comment.description} />
          )}

          {/* Upvote and edit */}
          <div className="flex flex-row space-x-1 pt-1 align-middle">
            <button
              disabled={
                !userId ||
                commentUpvoteUpsertMutation.isLoading ||
                commentUpvoteDeleteMutation.isLoading
              }
              type="button"
              onClick={() => onVote(Vote.UPVOTE)}>
              <ArrowUpCircleIcon
                className={clsx(
                  'h-4 w-4',
                  comment.userVote?.value === Vote.UPVOTE
                    ? 'fill-indigo-500'
                    : 'fill-gray-400',
                  userId && 'hover:fill-indigo-500',
                )}
              />
            </button>

            <div className="text-xs">{comment.numVotes}</div>

            <button
              disabled={
                !userId ||
                commentUpvoteUpsertMutation.isLoading ||
                commentUpvoteDeleteMutation.isLoading
              }
              type="button"
              onClick={() => onVote(Vote.DOWNVOTE)}>
              <ArrowDownCircleIcon
                className={clsx(
                  'h-4 w-4',
                  comment.userVote?.value === Vote.DOWNVOTE
                    ? 'fill-red-500'
                    : 'fill-gray-400',
                  userId && 'hover:fill-red-500',
                )}
              />
            </button>

            {isCommentOwner && !isEditingComment && (
              <button
                className="text-primary-800 hover:text-primary-400 px-1 text-xs"
                type="button"
                onClick={() => setIsEditingComment(true)}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
