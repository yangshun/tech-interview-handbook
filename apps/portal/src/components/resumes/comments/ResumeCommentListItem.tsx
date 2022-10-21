import clsx from 'clsx';
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
    <div
      className={clsx(
        'min-w-fit rounded-md bg-white ',
        !comment.parentId &&
          'w-11/12 border-2 border-indigo-300 p-2 drop-shadow-md',
      )}>
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
                  'font-medium text-black',
                  !!comment.parentId && 'text-sm',
                )}>
                {comment.user.name ?? 'Reviewer ABC'}
              </p>

              <p className="text-xs font-medium text-indigo-800">
                {isCommentOwner ? '(Me)' : ''}
              </p>

              <ResumeUserBadges userId={comment.user.userId} />
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
            <ResumeCommentEditForm
              comment={comment}
              setIsEditingComment={setIsEditingComment}
            />
          ) : (
            <ResumeExpandableText text={comment.description} />
          )}

          {/* Upvote and edit */}
          <div className="flex flex-row space-x-1 pt-1 align-middle">
            <ResumeCommentVoteButtons commentId={comment.id} userId={userId} />

            {/* Action buttons; only present when not editing/replying */}
            {isCommentOwner && !isEditingComment && !isReplyingComment && (
              <>
                <button
                  className="px-1 text-xs text-indigo-800 hover:text-indigo-400"
                  type="button"
                  onClick={() => setIsEditingComment(true)}>
                  Edit
                </button>

                {!comment.parentId && (
                  <button
                    className="px-1 text-xs text-indigo-800 hover:text-indigo-400"
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
                className="flex items-center space-x-1 rounded-md text-xs font-medium text-indigo-800 hover:text-indigo-300"
                type="button"
                onClick={() => setShowReplies(!showReplies)}>
                <ChevronUpIcon
                  className={clsx(
                    'h-5 w-5 ',
                    !showReplies && 'rotate-180 transform',
                  )}
                />
                <span>{showReplies ? 'Hide replies' : 'Show replies'}</span>
              </button>

              {showReplies &&
                comment.children.map((child) => {
                  return (
                    <ResumeCommentListItem
                      key={child.id}
                      comment={child}
                      userId={userId}
                    />
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
