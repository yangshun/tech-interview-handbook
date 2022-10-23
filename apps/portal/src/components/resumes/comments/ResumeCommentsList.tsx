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
import { Spinner } from '@tih/ui';
import { Button } from '@tih/ui';

import { trpc } from '~/utils/trpc';

import { RESUME_COMMENTS_SECTIONS } from './resumeCommentConstants';
import ResumeCommentListItem from './ResumeCommentListItem';
import ResumeSignInButton from '../shared/ResumeSignInButton';

import type { ResumeComment } from '~/types/resume-comments';

type ResumeCommentsListProps = Readonly<{
  resumeId: string;
  setShowCommentsForm: (show: boolean) => void;
}>;

export default function ResumeCommentsList({
  resumeId,
  setShowCommentsForm,
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

  const renderButton = () => {
    if (sessionData === null) {
      return <ResumeSignInButton text="to join discussion" />;
    }
    return (
      <Button
        className="-mb-2"
        display="block"
        label="Add your review"
        variant="tertiary"
        onClick={() => setShowCommentsForm(true)}
      />
    );
  };

  return (
    <div className="space-y-3">
      {renderButton()}

      {commentsQuery.isLoading ? (
        <div className="col-span-10 pt-4">
          <Spinner display="block" size="lg" />
        </div>
      ) : (
        <div className="m-2 flow-root h-[calc(100vh-17rem)] w-full flex-col space-y-4 overflow-y-auto overflow-x-hidden pt-14 pb-6">
          {RESUME_COMMENTS_SECTIONS.map(({ label, value }) => {
            const comments = commentsQuery.data
              ? commentsQuery.data.filter((comment: ResumeComment) => {
                  return (comment.section as string) === value;
                })
              : [];
            const commentCount = comments.length;

            return (
              <div key={value} className="mb-4 space-y-4">
                <div className="flex flex-row items-center space-x-2 text-indigo-800">
                  {renderIcon(value)}

                  <div className="w-fit text-lg font-medium">{label}</div>
                </div>

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
                  <div>There are no comments for this section yet!</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
