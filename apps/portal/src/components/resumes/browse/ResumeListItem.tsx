import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import type { UrlObject } from 'url';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { ChatBubbleLeftIcon, StarIcon } from '@heroicons/react/24/outline';

import type { Resume } from '~/types/resume';

type Props = Readonly<{
  href: UrlObject | string;
  resumeInfo: Resume;
}>;

export default function BrowseListItem({ href, resumeInfo }: Props) {
  return (
    <Link href={href}>
      <div className="grid grid-cols-8 gap-4 border-b border-slate-200 p-4">
        <div className="col-span-4">
          {resumeInfo.title}
          <div className="mt-2 flex items-center justify-start text-xs text-indigo-500">
            {resumeInfo.role}
            <div className="ml-6 rounded-md border border-indigo-500 p-1">
              {resumeInfo.experience}
            </div>
          </div>
          <div className="mt-2 flex justify-start text-xs text-slate-500">
            <div className="flex gap-2 pr-8">
              <ChatBubbleLeftIcon className="w-4" />
              {resumeInfo.numComments} comments
            </div>
            <div className="flex gap-2">
              <StarIcon className="w-4" />
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
