import clsx from 'clsx';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Error from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  CalendarIcon,
  InformationCircleIcon,
  MapPinIcon,
  StarIcon,
} from '@heroicons/react/20/solid';
import { Spinner } from '@tih/ui';

import CommentsSection from '~/components/resumes/comments/CommentsSection';
import ResumePdf from '~/components/resumes/ResumePdf';

import { trpc } from '~/utils/trpc';

export default function ResumeReviewPage() {
  const ErrorPage = (
    <Error statusCode={404} title="Requested resume does not exist." />
  );
  const { data: session } = useSession();
  const router = useRouter();
  const { resumeId } = router.query;
  const utils = trpc.useContext();
  // Safe to assert resumeId type as string because query is only sent if so
  const detailsQuery = trpc.useQuery(
    ['resumes.details.find', { resumeId: resumeId as string }],
    {
      enabled: typeof resumeId === 'string' && session?.user?.id !== undefined,
    },
  );
  const starMutation = trpc.useMutation('resumes.details.update_star', {
    onSuccess() {
      utils.invalidateQueries();
    },
  });

  useEffect(() => {
    if (detailsQuery.data?.stars.length) {
      document.getElementById('star-button')?.focus();
    } else {
      document.getElementById('star-button')?.blur();
    }
  }, [detailsQuery.data?.stars]);

  const onStarButtonClick = () => {
    // Star button only rendered if resume exists
    // Star button only clickable if user exists
    starMutation.mutate({
      resumeId: resumeId as string,
    });
  };

  return (
    <>
      {detailsQuery.isError && ErrorPage}
      {detailsQuery.isLoading && (
        <div className="w-full pt-4">
          {' '}
          <Spinner display="block" size="lg" />{' '}
        </div>
      )}
      {detailsQuery.isFetched && detailsQuery.data && (
        <>
          <Head>
            <title>{detailsQuery.data.title}</title>
          </Head>
          <main className="h-[calc(100vh-2rem)] flex-1 overflow-y-scroll p-4">
            <div className="flex flex-row space-x-8">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {detailsQuery.data.title}
              </h1>
              <button
                className="isolate inline-flex max-h-10 items-center space-x-4 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                disabled={session?.user === null}
                id="star-button"
                type="button"
                onClick={onStarButtonClick}>
                <span className="relative inline-flex">
                  <StarIcon
                    aria-hidden="true"
                    className={clsx(
                      detailsQuery.data?.stars.length
                        ? 'text-orange-400'
                        : 'text-gray-400',
                      '-ml-1 mr-2 h-5 w-5',
                    )}
                    id="star-icon"
                  />
                  Star
                </span>
                <span className="relative -ml-px inline-flex">
                  {detailsQuery.data._count.stars}
                </span>
              </button>
            </div>
            <div className="flex flex-col pt-1 lg:mt-0 lg:flex-row lg:flex-wrap lg:space-x-8">
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <BriefcaseIcon
                  aria-hidden="true"
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                />
                {detailsQuery.data.role}
              </div>
              <div className="flex items-center pt-2 text-sm text-gray-500">
                <MapPinIcon
                  aria-hidden="true"
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                />
                {detailsQuery.data.location}
              </div>
              <div className="flex items-center pt-2 text-sm text-gray-500">
                <AcademicCapIcon
                  aria-hidden="true"
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                />
                {detailsQuery.data.experience}
              </div>
              <div className="flex items-center pt-2 text-sm text-gray-500">
                <CalendarIcon
                  aria-hidden="true"
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                />
                {`Uploaded ${formatDistanceToNow(
                  new Date(detailsQuery.data.createdAt),
                  { addSuffix: true },
                )} by ${detailsQuery.data.user.name}`}
              </div>
            </div>
            {detailsQuery.data.additionalInfo && (
              <div className="flex items-center pt-2 text-sm text-gray-500">
                <InformationCircleIcon
                  aria-hidden="true"
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                />
                {detailsQuery.data.additionalInfo}
              </div>
            )}
            <div className="flex w-full flex-col py-4 lg:flex-row">
              <div className="w-full lg:w-[800px]">
                <ResumePdf url={detailsQuery.data.url} />
              </div>
              <div className="mx-8 grow">
                <CommentsSection resumeId={resumeId as string} />
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}
