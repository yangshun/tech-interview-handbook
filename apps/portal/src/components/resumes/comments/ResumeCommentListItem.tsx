import clsx from 'clsx';
import type { Dispatch, SetStateAction } from 'react';
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

  const [upvoteAnimation, setUpvoteAnimation] = useState(false);
  const [downvoteAnimation, setDownvoteAnimation] = useState(false);

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

  // COMMENT VOTES
  const commentVotesQuery = trpc.useQuery([
    'resumes.comments.votes.list',
    { commentId: comment.id },
  ]);
  const commentVotesUpsertMutation = trpc.useMutation(
    'resumes.comments.votes.user.upsert',
    {
      onSuccess: () => {
        // Comment updated, invalidate query to trigger refetch
        trpcContext.invalidateQueries(['resumes.comments.votes.list']);
      },
    },
  );
  const commentVotesDeleteMutation = trpc.useMutation(
    'resumes.comments.votes.user.delete',
    {
      onSuccess: () => {
        // Comment updated, invalidate query to trigger refetch
        trpcContext.invalidateQueries(['resumes.comments.votes.list']);
      },
    },
  );

  // FORM ACTIONS
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

  const onVote = async (
    value: Vote,
    setAnimation: Dispatch<SetStateAction<boolean>>,
  ) => {
    setAnimation(true);

    if (commentVotesQuery.data?.userVote?.value === value) {
      return commentVotesDeleteMutation.mutate(
        {
          commentId: comment.id,
        },
        {
          onSettled: async () => setAnimation(false),
        },
      );
    }
    return commentVotesUpsertMutation.mutate(
      {
        commentId: comment.id,
        value,
      },
      {
        onSettled: async () => setAnimation(false),
      },
    );
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
                commentVotesQuery.isLoading ||
                commentVotesUpsertMutation.isLoading ||
                commentVotesDeleteMutation.isLoading
              }
              type="button"
              onClick={() => onVote(Vote.UPVOTE, setUpvoteAnimation)}>
              <ArrowUpCircleIcon
                className={clsx(
                  'h-4 w-4',
                  commentVotesQuery.data?.userVote?.value === Vote.UPVOTE ||
                    upvoteAnimation
                    ? 'fill-indigo-500'
                    : 'fill-gray-400',
                  userId &&
                    !downvoteAnimation &&
                    !upvoteAnimation &&
                    'hover:fill-indigo-500',
                  upvoteAnimation &&
                    'animate-[bounce_0.5s_infinite] cursor-default',
                )}
              />
            </button>

            <div className="text-xs">
              {commentVotesQuery.data?.numVotes ?? 0}
            </div>

            <button
              disabled={
                !userId ||
                commentVotesQuery.isLoading ||
                commentVotesUpsertMutation.isLoading ||
                commentVotesDeleteMutation.isLoading
              }
              type="button"
              onClick={() => onVote(Vote.DOWNVOTE, setDownvoteAnimation)}>
              <ArrowDownCircleIcon
                className={clsx(
                  'h-4 w-4',
                  commentVotesQuery.data?.userVote?.value === Vote.DOWNVOTE ||
                    downvoteAnimation
                    ? 'fill-red-500'
                    : 'fill-gray-400',
                  userId &&
                    !downvoteAnimation &&
                    !upvoteAnimation &&
                    'hover:fill-red-500',
                  downvoteAnimation &&
                    'animate-[bounce_0.5s_infinite] cursor-default',
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
