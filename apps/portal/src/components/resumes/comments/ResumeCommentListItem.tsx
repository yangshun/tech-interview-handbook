import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from '@heroicons/react/20/solid';
import { FaceSmileIcon } from '@heroicons/react/24/outline';

import ResumeExpandableText from '../shared/ResumeExpandableText';

import type { ResumeComment } from '~/types/resume-comments';

type ResumeCommentListItemProps = {
  comment: ResumeComment;
  userId?: string;
};

export default function ResumeCommentListItem({
  comment,
  userId,
}: ResumeCommentListItemProps) {
  const isCommentOwner = userId === comment.user.userId;

  return (
    <div className="border-primary-300 w-3/4 rounded-md border-2 bg-white p-2 drop-shadow-md">
      <div className="flex w-full flex-row space-x-2 p-1 align-top">
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

            <div className="text-xs text-gray-600">
              {comment.createdAt.toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </div>
          </div>

          {/* Description */}
          <ResumeExpandableText>{comment.description}</ResumeExpandableText>

          {/* Upvote and edit */}
          <div className="flex flex-row space-x-1 pt-1 align-middle">
            {/* TODO: Implement upvote */}
            <ArrowUpCircleIcon className="h-4 w-4 fill-gray-400" />
            <div className="text-xs">{comment.numVotes}</div>
            <ArrowDownCircleIcon className="h-4 w-4 fill-gray-400" />

            {/* TODO: Implement edit */}
            {isCommentOwner ? (
              <div className="text-primary-800 hover:text-primary-400 px-1 text-xs">
                Edit
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
