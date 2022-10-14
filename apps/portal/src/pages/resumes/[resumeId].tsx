import clsx from 'clsx';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Error from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  CalendarIcon,
  InformationCircleIcon,
  MapPinIcon,
  PencilSquareIcon,
  StarIcon,
} from '@heroicons/react/20/solid';
import { Spinner } from '@tih/ui';

import ResumeCommentsSection from '~/components/resumes/comments/ResumeCommentsSection';
import ResumePdf from '~/components/resumes/ResumePdf';
import ResumeExpandableText from '~/components/resumes/shared/ResumeExpandableText';

import { trpc } from '~/utils/trpc';

import SubmitResumeForm from './submit';

export default function ResumeReviewPage() {
  const ErrorPage = (
    <Error statusCode={404} title="Requested resume does not exist" />
  );
  const { data: session } = useSession();
  const router = useRouter();
  const { resumeId } = router.query;
  const utils = trpc.useContext();
  // Safe to assert resumeId type as string because query is only sent if so
  const detailsQuery = trpc.useQuery(
    ['resumes.resume.findOne', { resumeId: resumeId as string }],
    {
      enabled: typeof resumeId === 'string',
    },
  );
  const starMutation = trpc.useMutation('resumes.resume.star', {
    onSuccess() {
      utils.invalidateQueries(['resumes.resume.findOne']);
    },
  });
  const unstarMutation = trpc.useMutation('resumes.resume.unstar', {
    onSuccess() {
      utils.invalidateQueries(['resumes.resume.findOne']);
    },
  });

  const userIsOwner =
    session?.user?.id != null && session.user.id === detailsQuery.data?.userId;

  const [isEditMode, setIsEditMode] = useState(false);

  const onStarButtonClick = () => {
    if (session?.user?.id == null) {
      router.push('/api/auth/signin');
      return;
    }

    // Star button only rendered if resume exists
    // Star button only clickable if user exists
    if (detailsQuery.data?.stars.length) {
      unstarMutation.mutate({
        resumeId: resumeId as string,
      });
    } else {
      starMutation.mutate({
        resumeId: resumeId as string,
      });
    }
  };

  const onEditButtonClick = () => {
    setIsEditMode(true);
  };

  if (isEditMode && detailsQuery.data != null) {
    return (
      <SubmitResumeForm
        initFormDetails={{
          additionalInfo: detailsQuery.data.additionalInfo ?? '',
          experience: detailsQuery.data.experience,
          location: detailsQuery.data.location,
          resumeId: resumeId as string,
          role: detailsQuery.data.role,
          title: detailsQuery.data.title,
          url: detailsQuery.data.url,
        }}
        onClose={() => {
          utils.invalidateQueries(['resumes.resume.findOne']);
          setIsEditMode(false);
        }}
      />
    );
  }

  return (
    <>
      {(detailsQuery.isError || detailsQuery.data === null) && ErrorPage}
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
          <main className="h-[calc(100vh-2rem)] flex-1 overflow-y-auto p-4">
            <div className="flex space-x-8">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {detailsQuery.data.title}
              </h1>
              <div className="flex gap-4">
                <button
                  className="isolate inline-flex h-10 items-center space-x-4 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50  disabled:hover:bg-white"
                  disabled={starMutation.isLoading || unstarMutation.isLoading}
                  type="button"
                  onClick={onStarButtonClick}>
                  <span className="relative inline-flex">
                    <div className="-ml-1 mr-2 h-5 w-5">
                      {starMutation.isLoading || unstarMutation.isLoading ? (
                        <Spinner className="mt-0.5" size="xs" />
                      ) : (
                        <StarIcon
                          aria-hidden="true"
                          className={clsx(
                            detailsQuery.data?.stars.length
                              ? 'text-orange-400'
                              : 'text-gray-400',
                          )}
                        />
                      )}
                    </div>
                    Star
                  </span>
                  <span className="relative -ml-px inline-flex">
                    {detailsQuery.data?._count.stars}
                  </span>
                </button>
                {userIsOwner && (
                  <button
                    className="p h-10 rounded-md border border-gray-300 bg-white py-1 px-2 text-center"
                    type="button"
                    onClick={onEditButtonClick}>
                    <PencilSquareIcon className="h-6 w-6 text-indigo-500 hover:text-indigo-300" />
                  </button>
                )}
              </div>
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
              <div className="flex items-start whitespace-pre-wrap pt-2 text-sm text-gray-500">
                <InformationCircleIcon
                  aria-hidden="true"
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                />
                <ResumeExpandableText>
                  {detailsQuery.data.additionalInfo}
                </ResumeExpandableText>
              </div>
            )}
            <div className="flex w-full flex-col py-4 lg:flex-row">
              <div className="w-full lg:w-[780px]">
                <ResumePdf url={detailsQuery.data.url} />
              </div>
              <div className="mx-8 grow">
                <ResumeCommentsSection resumeId={resumeId as string} />
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}
