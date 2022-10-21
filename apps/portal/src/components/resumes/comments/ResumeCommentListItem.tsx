import { useState } from 'react';
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
              <p className="font-medium">
                {comment.user.name ?? 'Reviewer ABC'}
              </p>

              <p className="text-primary-800 text-xs font-medium">
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

            {isCommentOwner && !isEditingComment && !isReplyingComment && (
              <>
                <button
                  className="text-primary-800 hover:text-primary-400 px-1 text-xs"
                  type="button"
                  onClick={() => setIsEditingComment(true)}>
                  Edit
                </button>

                <button
                  className="text-primary-800 hover:text-primary-400 px-1 text-xs"
                  type="button"
                  onClick={() => setIsReplyingComment(true)}>
                  Reply
                </button>
              </>
            )}
          </div>

          {/* Replies */}
          {isReplyingComment && (
            <ResumeCommentReplyForm
              parentId={comment.id}
              resumeId={comment.resumeId}
              section={comment.section}
              setIsReplyingComment={setIsReplyingComment}
            />
          )}
        </div>
      </div>
    </div>
  );
}
