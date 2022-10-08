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
      <div className="flex justify-between border-b border-slate-200 p-4">
        <div>
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
        <div className="self-center text-sm text-slate-500">
          {/* TODO: Replace hardcoded days ago with calculated days ago*/}
          Uploaded 2 days ago by {resumeInfo.user}
        </div>
        <ChevronRightIcon className="w-8" />
      </div>
    </Link>
  );
}
