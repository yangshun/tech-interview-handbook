import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { FaceSmileIcon } from '@heroicons/react/24/outline';

import ResumeCommentEditForm from './comment/ResumeCommentEditForm';
import ResumeCommentReplyForm from './comment/ResumeCommentReplyForm';
import ResumeCommentVoteButtons from './comment/ResumeCommentVoteButtons';
import ResumeUserBadges from '../badges/ResumeUserBadges';
import ResumeExpandableText from '../shared/ResumeExpandableText';

import type { ResumeComment } from '~/types/resume-comments';

type ResumeCommentListItemProps = {
  comment: ResumeComment;
  userId: string | undefined;
};

export default function ResumeCommentListItem({
  comment,
  userId,
}: ResumeCommentListItemProps) {
  const isCommentOwner = userId === comment.user.userId;
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [isReplyingComment, setIsReplyingComment] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  return (
    <div className="min-w-fit">
      <div className="flex flex-row space-x-2 p-1 align-top">
        {/* Image Icon */}
        {comment.user.image ? (
          <img
            alt={comment.user.name ?? 'Reviewer'}
            className={clsx(
              'mt-1 rounded-full',
              comment.parentId ? 'h-6 w-6' : 'h-8 w-8 ',
            )}
            src={comment.user.image!}
          />
        ) : (
          <FaceSmileIcon
            className={clsx(
              'mt-1 rounded-full',
              comment.parentId ? 'h-6 w-6' : 'h-8 w-8 ',
            )}
          />
        )}

        <div className="flex w-full flex-col space-y-1">
          {/* Name and creation time */}
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center space-x-1">
              <p
                className={clsx(
                  'font-medium text-gray-800',
                  !!comment.parentId && 'text-sm',
                )}>
                {comment.user.name ?? 'Reviewer ABC'}
              </p>

              <p className="text-primary-800 text-xs font-medium">
                {isCommentOwner ? '(Me)' : ''}
              </p>

              <ResumeUserBadges userId={comment.user.userId} />
            </div>

            <div className="px-2 text-xs text-slate-600">
              {formatDistanceToNow(comment.createdAt, {
                addSuffix: true,
              })}
            </div>
          </div>

          {/* Description */}
          {isEditingComment ? (
            <ResumeCommentEditForm
              comment={comment}
              setIsEditingComment={setIsEditingComment}
            />
          ) : (
            <div className="text-gray-800">
              <ResumeExpandableText
                key={comment.description}
                text={comment.description}
              />
            </div>
          )}

          {/* Upvote and edit */}
          <div className="flex flex-row space-x-1 pt-1 align-middle">
            <ResumeCommentVoteButtons commentId={comment.id} userId={userId} />

            {/* Action buttons; only present for authenticated user when not editing/replying */}
            {userId && !isEditingComment && !isReplyingComment && (
              <>
                {isCommentOwner && (
                  <button
                    className="text-primary-800 hover:text-primary-400 px-1 text-xs"
                    type="button"
                    onClick={() => setIsEditingComment(true)}>
                    Edit
                  </button>
                )}

                {!comment.parentId && (
                  <button
                    className="text-primary-800 hover:text-primary-400 px-1 text-xs"
                    type="button"
                    onClick={() => setIsReplyingComment(true)}>
                    Reply
                  </button>
                )}
              </>
            )}
          </div>

          {/* Reply Form */}
          {isReplyingComment && (
            <ResumeCommentReplyForm
              parentId={comment.id}
              resumeId={comment.resumeId}
              section={comment.section}
              setIsReplyingComment={setIsReplyingComment}
            />
          )}

          {/* Replies */}
          {comment.children.length > 0 && (
            <div className="min-w-fit space-y-1 pt-2">
              <button
                className="text-primary-800 hover:text-primary-300 flex items-center space-x-1 rounded-md text-xs font-medium"
                type="button"
                onClick={() => setShowReplies(!showReplies)}>
                <ChevronUpIcon
                  className={clsx(
                    'h-5 w-5 ',
                    !showReplies && 'rotate-180 transform',
                  )}
                />
                <span>
                  {showReplies
                    ? `Hide ${
                        comment.children.length === 1 ? 'reply' : 'replies'
                      }`
                    : `Show ${comment.children.length} ${
                        comment.children.length === 1 ? 'reply' : 'replies'
                      }`}
                </span>
              </button>

              {showReplies && (
                <div className="flex flex-row">
                  <div className="relative flex flex-col px-2 py-2">
                    <div className="flex-grow border-r border-slate-300" />
                  </div>

                  <div className="flex flex-1 flex-col space-y-1">
                    {comment.children.map((child) => {
                      return (
                        <ResumeCommentListItem
                          key={child.id}
                          comment={child}
                          userId={userId}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
