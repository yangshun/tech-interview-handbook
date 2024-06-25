import { useSession } from 'next-auth/react';
import {
  BookOpenIcon,
  BriefcaseIcon,
  CodeBracketSquareIcon,
  FaceSmileIcon,
  IdentificationIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { ResumesSection } from '@prisma/client';
import { Spinner } from '~/ui';

import { trpc } from '~/utils/trpc';

import { RESUME_COMMENTS_SECTIONS } from './resumeCommentConstants';
import ResumeCommentListItem from './ResumeCommentListItem';

import type { ResumeComment } from '~/types/resume-comments';

type ResumeCommentsListProps = Readonly<{
  resumeId: string;
}>;

export default function ResumeCommentsList({
  resumeId,
}: ResumeCommentsListProps) {
  const { data: sessionData } = useSession();

  const commentsQuery = trpc.useQuery(['resumes.comments.list', { resumeId }]);

  const renderIcon = (section: ResumesSection) => {
    const className = 'h-5 w-5';
    switch (section) {
      case ResumesSection.GENERAL:
        return <IdentificationIcon className={className} />;
      case ResumesSection.EDUCATION:
        return <BookOpenIcon className={className} />;
      case ResumesSection.EXPERIENCE:
        return <BriefcaseIcon className={className} />;
      case ResumesSection.PROJECTS:
        return <CodeBracketSquareIcon className={className} />;
      case ResumesSection.SKILLS:
        return <SparklesIcon className={className} />;
      default:
        return <FaceSmileIcon className={className} />;
    }
  };

  if (commentsQuery.isLoading) {
    return (
      <div className="col-span-10 pt-4">
        <Spinner display="block" size="lg" />
      </div>
    );
  }

  return (
    <div className="flow-root w-full space-y-4 overflow-y-auto overflow-x-hidden px-4 lg:py-8">
      {RESUME_COMMENTS_SECTIONS.map(({ label, value }) => {
        const comments = commentsQuery.data
          ? commentsQuery.data.filter((comment: ResumeComment) => {
              return (comment.section as string) === value;
            })
          : [];
        const commentCount = comments.length;

        return (
          <div
            key={value}
            className="rounded-lg border border-slate-200 bg-white shadow-sm">
            {/* CommentHeader Section */}
            <div className="flex items-center space-x-2 border-b border-slate-200 px-4 py-3 font-medium text-slate-700">
              {renderIcon(value)}
              <span className="w-fit text-sm font-medium uppercase tracking-wide">
                {label}
              </span>
            </div>

            {/* Comment Section */}
            <div className="space-y-4 px-4 py-3">
              {commentCount > 0 ? (
                comments.map((comment) => {
                  return (
                    <ResumeCommentListItem
                      key={comment.id}
                      comment={comment}
                      userId={sessionData?.user?.id}
                    />
                  );
                })
              ) : (
                <div className="flex flex-row items-center text-sm">
                  <div className="text-slate-500">
                    There are no comments for this section.
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
