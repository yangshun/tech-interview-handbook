import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { FaceSmileIcon } from '@heroicons/react/24/outline';

import ResumeCommentEditForm from './comment/ResumeCommentEditForm';
import ResumeCommentReplyForm from './comment/ResumeCommentReplyForm';
import ResumeCommentVoteButtons from './comment/ResumeCommentVoteButtons';
import ResumeUserBadges from '../badges/ResumeUserBadges';
import ResumeExpandableText from '../shared/ResumeExpandableText';

import type { ResumeComment } from '~/types/resume-comments';

type ResumeCommentListItemProps = Readonly<{
  comment: ResumeComment;
  userId: string | undefined;
}>;

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
      <div className="flex flex-row space-x-3 align-top">
        {/* Image Icon */}
        {comment.user.image ? (
          <img
            alt={comment.user.name ?? 'Reviewer'}
            className={clsx(
              'mt-1 rounded-full',
              comment.parentId ? 'h-8 w-8' : 'h-10 w-10',
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
          <div className="flex flex-row items-center space-x-2">
            <p className={clsx('text-sm font-medium text-slate-800')}>
              {comment.user.name ?? 'Reviewer ABC'}
            </p>
            {isCommentOwner && (
              <span className="bg-primary-100 text-primary-800 rounded-md py-0.5 px-1 text-xs">
                Me
              </span>
            )}
            <ResumeUserBadges userId={comment.user.userId} />
            <span className="font-medium text-slate-500">&middot;</span>
            <div className="text-xs text-slate-500">
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
            <div className="text-slate-800">
              <ResumeExpandableText
                key={comment.description}
                text={comment.description}
              />
            </div>
          )}

          {/* Upvote and edit */}
          <div className="flex flex-row space-x-2 pt-1 align-middle">
            <ResumeCommentVoteButtons commentId={comment.id} userId={userId} />
            {/* Action buttons; only present for authenticated user when not editing/replying */}
            {userId && !isEditingComment && !isReplyingComment && (
              <>
                {isCommentOwner && (
                  <>
                    <span className="font-medium text-slate-500">&middot;</span>{' '}
                    <button
                      className="text-xs font-medium text-slate-500 hover:text-slate-600"
                      type="button"
                      onClick={() => setIsEditingComment(true)}>
                      Edit
                    </button>
                  </>
                )}
                {!comment.parentId && (
                  <>
                    <span className="font-medium text-slate-500">&middot;</span>{' '}
                    <button
                      className="text-xs font-medium text-slate-500 hover:text-slate-600"
                      type="button"
                      onClick={() => setIsReplyingComment(true)}>
                      Reply
                    </button>
                  </>
                )}
              </>
            )}
            {comment.children.length > 0 && (
              <>
                <span className="font-medium text-slate-500">&middot;</span>{' '}
                <button
                  className="flex items-center space-x-1 rounded-md text-xs font-medium text-slate-500 hover:text-slate-600"
                  type="button"
                  onClick={() => setShowReplies(!showReplies)}>
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
          {comment.children.length > 0 && showReplies && (
            <div className="min-w-fit space-y-1 pt-2">
              <div className="flex flex-row border-l-2 border-slate-200 pl-2">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
