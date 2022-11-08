import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

import ResumeCommentDeleteForm from './comment/ResumeCommentDeleteForm';
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
  const [isDeletingComment, setIsDeletingComment] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  return (
    <div className="min-w-fit">
      <div className="flex flex-row space-x-3 align-top">
        {/* Image Icon */}
        <img
          alt={comment.user.name ?? 'Reviewer'}
          className={clsx(
            'mt-1 rounded-full',
            comment.parentId ? 'h-7 w-7' : 'h-9 w-9',
          )}
          src={`https://avatars.dicebear.com/api/gridy/${
            comment.user.name ?? 'random'
          }.svg`}
        />
        <div className="flex w-full flex-col space-y-1">
          {/* Name and creation time */}
          <div className="flex flex-row items-center space-x-2">
            <p className="text-sm font-medium text-slate-900">
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

          {/* Upvote and actions (edit, reply, delete) */}
          <div className="mt-1 flex h-6 items-center">
            <ResumeCommentVoteButtons commentId={comment.id} userId={userId} />
            {/* Action buttons; only present for authenticated user when not editing/replying */}
            {userId && !comment.parentId && (
              <button
                className="-my-1 rounded-md px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-600"
                type="button"
                onClick={() => {
                  setIsReplyingComment(!isReplyingComment);
                  setIsEditingComment(false);
                  setIsDeletingComment(false);
                }}>
                Reply
              </button>
            )}
            {comment.children.length > 0 && (
              <button
                className="-my-1 rounded-md px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-600"
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
            )}
            {isCommentOwner && (
              <button
                className="-my-1 rounded-md px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-600"
                type="button"
                onClick={() => {
                  setIsEditingComment(!isEditingComment);
                  setIsReplyingComment(false);
                  setIsDeletingComment(false);
                }}>
                Edit
              </button>
            )}

            {isCommentOwner && (
              <button
                className="-my-1 rounded-md px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-red-600"
                type="button"
                onClick={() => {
                  setIsDeletingComment(!isDeletingComment);
                  setIsEditingComment(false);
                  setIsReplyingComment(false);
                }}>
                Delete
              </button>
            )}

            {/* Delete comment form */}
            {isDeletingComment && (
              <ResumeCommentDeleteForm
                id={comment.id}
                isDeletingComment={isDeletingComment}
                setIsDeletingComment={setIsDeletingComment}
              />
            )}
          </div>

          {/* Reply Form */}
          {isReplyingComment && (
            <div className="mt-2">
              <ResumeCommentReplyForm
                parentId={comment.id}
                resumeId={comment.resumeId}
                section={comment.section}
                setIsReplyingComment={setIsReplyingComment}
              />
            </div>
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
