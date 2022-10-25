import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import {
  BookOpenIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketSquareIcon,
  FaceSmileIcon,
  IdentificationIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { ResumesSection } from '@prisma/client';
import { Spinner } from '@tih/ui';

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
    const className = 'h-7 w-7';
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

  return (
    <div className="space-y-3">
      {commentsQuery.isLoading ? (
        <div className="col-span-10 pt-4">
          <Spinner display="block" size="lg" />
        </div>
      ) : (
        <div className="mb-8 flow-root h-[calc(100vh-13rem)] w-full flex-col space-y-4 overflow-y-auto overflow-x-hidden pb-16">
          {RESUME_COMMENTS_SECTIONS.map(({ label, value }) => {
            const comments = commentsQuery.data
              ? commentsQuery.data.filter((comment: ResumeComment) => {
                  return (comment.section as string) === value;
                })
              : [];
            const commentCount = comments.length;

            return (
              <div key={value} className="space-y-6 pr-4">
                <div className="text-primary-800 -mb-2 flex flex-row items-center space-x-2">
                  {renderIcon(value)}

                  <div className="w-fit text-lg font-medium">{label}</div>
                </div>

                <div
                  className={clsx(
                    'space-y-2 rounded-md border-2 bg-white px-4 py-3 drop-shadow-md',
                    commentCount ? 'border-slate-300' : 'border-slate-300',
                  )}>
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
                      <ChatBubbleLeftRightIcon className="mr-2 h-6 w-6 text-slate-500" />

                      <div className="text-slate-500">
                        There are no comments for this section yet!
                      </div>
                    </div>
                  )}
                </div>

                <hr className="border-gray-300" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
