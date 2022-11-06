import clsx from 'clsx';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Link from 'next/link';
import type { UrlObject } from 'url';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  ChevronRightIcon,
  StarIcon as ColouredStarIcon,
} from '@heroicons/react/20/solid';
import { ChatBubbleLeftIcon, StarIcon } from '@heroicons/react/24/outline';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';

import { getFilterLabel } from '~/utils/resumes/resumeFilters';

import type { Resume } from '~/types/resume';

type Props = Readonly<{
  href: UrlObject | string;
  resumeInfo: Resume;
}>;

export default function ResumeListItem({ href, resumeInfo }: Props) {
  const { event: gaEvent } = useGoogleAnalytics();
  return (
    <Link
      href={href}
      onClick={() =>
        gaEvent({
          action: 'resumes.listitem_click',
          category: 'engagement',
          label: 'Select Resume',
        })
      }>
      <div className="grid grid-cols-8">
        <div className="col-span-7 grid gap-4 border-b border-slate-200 p-4 hover:bg-slate-100 sm:grid-cols-7">
          <div className="sm:col-span-4">
            <div className="flex items-center gap-3">
              <p className="truncate">{resumeInfo.title}</p>
              <p
                className={clsx(
                  'w-auto items-center space-x-4 rounded-xl border px-2 py-1 text-xs font-medium',
                  resumeInfo.isResolved ? 'bg-slate-300' : 'bg-success-100',
                  resumeInfo.isResolved ? 'text-slate-600' : 'text-success-700',
                )}>
                {resumeInfo.isResolved ? 'Reviewed' : 'Unreviewed'}
              </p>
            </div>
            <div className="text-primary-500 mt-2 flex items-center justify-start text-xs">
              <div className="flex">
                <BriefcaseIcon
                  aria-hidden="true"
                  className="mr-1.5 h-4 w-4 flex-shrink-0"
                />
                {getFilterLabel('role', resumeInfo.role)}
              </div>
              <div className="ml-4 flex">
                <AcademicCapIcon
                  aria-hidden="true"
                  className="mr-1.5 h-4 w-4 flex-shrink-0"
                />
                {getFilterLabel('experience', resumeInfo.experience)}
              </div>
            </div>
            <div className="mt-4 flex justify-start text-xs text-slate-500">
              <div className="flex gap-2 pr-4">
                <ChatBubbleLeftIcon className="w-4" />
                {`${resumeInfo.numComments} comment${
                  resumeInfo.numComments === 1 ? '' : 's'
                }`}
              </div>
              <div className="flex gap-2">
                {resumeInfo.isStarredByUser ? (
                  <ColouredStarIcon className="w-4 text-yellow-400" />
                ) : (
                  <StarIcon className="w-4" />
                )}
                {`${resumeInfo.numStars} star${
                  resumeInfo.numStars === 1 ? '' : 's'
                }`}
              </div>
            </div>
          </div>
          <div className="self-center text-sm text-slate-500 sm:col-span-3">
            <div>
              {`Uploaded ${formatDistanceToNow(resumeInfo.createdAt, {
                addSuffix: true,
              })} by ${resumeInfo.user}`}
            </div>
            <div className="mt-2 text-slate-400">{resumeInfo.location}</div>
          </div>
        </div>
        <ChevronRightIcon className="col-span-1 w-8 self-center justify-self-center text-slate-400" />
      </div>
    </Link>
  );
}
