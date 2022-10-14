import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import type { UrlObject } from 'url';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  StarIcon as ColouredStarIcon,
} from '@heroicons/react/20/solid';
import { ChatBubbleLeftIcon, StarIcon } from '@heroicons/react/24/outline';

import { trpc } from '~/utils/trpc';

import type { Resume } from '~/types/resume';

type Props = Readonly<{
  href: UrlObject | string;
  resumeInfo: Resume;
}>;

export default function BrowseListItem({ href, resumeInfo }: Props) {
  const { data: sessionData } = useSession();

  // Find out if user has starred this particular resume
  const resumeId = resumeInfo.id;
  const isStarredQuery = trpc.useQuery([
    'resumes.resume.user.isResumeStarred',
    { resumeId },
  ]);

  return (
    <Link href={href}>
      <div className="grid grid-cols-8 gap-4 border-b border-slate-200 p-4 hover:bg-slate-100">
        <div className="col-span-4">
          {resumeInfo.title}
          <div className="mt-2 flex items-center justify-start text-xs text-indigo-500">
            <div className="flex">
              <BriefcaseIcon
                aria-hidden="true"
                className="mr-1.5 h-4 w-4 flex-shrink-0"
              />
              {resumeInfo.role}
            </div>
            <div className="ml-4 flex">
              <AcademicCapIcon
                aria-hidden="true"
                className="mr-1.5 h-4 w-4 flex-shrink-0"
              />
              {resumeInfo.experience}
            </div>
          </div>
          <div className="mt-4 flex justify-start text-xs text-slate-500">
            <div className="flex gap-2 pr-4">
              <ChatBubbleLeftIcon className="w-4" />
              {resumeInfo.numComments} comments
            </div>
            <div className="flex gap-2">
              {isStarredQuery.data && sessionData?.user ? (
                <ColouredStarIcon className="w-4 text-yellow-400" />
              ) : (
                <StarIcon className="w-4" />
              )}
              {resumeInfo.numStars} stars
            </div>
          </div>
        </div>
        <div className="col-span-3 self-center text-sm text-slate-500">
          <div>
            Uploaded {formatDistanceToNow(resumeInfo.createdAt)} ago by{' '}
            {resumeInfo.user}
          </div>
          <div className="mt-2 text-slate-400">{resumeInfo.location}</div>
        </div>
        <ChevronRightIcon className="col-span-1 w-8 self-center justify-self-center" />
      </div>
    </Link>
  );
}
