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
  CheckCircleIcon,
  InformationCircleIcon,
  MapPinIcon,
  PencilSquareIcon,
  StarIcon,
} from '@heroicons/react/20/solid';
import { Button, Spinner } from '@tih/ui';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';
import ResumeCommentsForm from '~/components/resumes/comments/ResumeCommentsForm';
import ResumeCommentsList from '~/components/resumes/comments/ResumeCommentsList';
import ResumePdf from '~/components/resumes/ResumePdf';
import ResumeExpandableText from '~/components/resumes/shared/ResumeExpandableText';
import loginPageHref from '~/components/shared/loginPageHref';

import type {
  ExperienceFilter,
  FilterOption,
  LocationFilter,
  RoleFilter,
} from '~/utils/resumes/resumeFilters';
import {
  BROWSE_TABS_VALUES,
  EXPERIENCES,
  getFilterLabel,
  INITIAL_FILTER_STATE,
  LOCATIONS,
  ROLES,
} from '~/utils/resumes/resumeFilters';
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
  const { event: gaEvent } = useGoogleAnalytics();

  // Safe to assert resumeId type as string because query is only sent if so
  const detailsQuery = trpc.useQuery(
    ['resumes.resume.findOne', { resumeId: resumeId as string }],
    {
      enabled: typeof resumeId === 'string',
    },
  );
  const starMutation = trpc.useMutation('resumes.resume.star', {
    onSuccess() {
      invalidateResumeQueries();
      gaEvent({
        action: 'resumes.star_button_click',
        category: 'engagement',
        label: 'Star Resume',
      });
    },
  });
  const unstarMutation = trpc.useMutation('resumes.resume.unstar', {
    onSuccess() {
      invalidateResumeQueries();
      gaEvent({
        action: 'resumes.star_button_click',
        category: 'engagement',
        label: 'Unstar Resume',
      });
    },
  });
  const resolveMutation = trpc.useMutation('resumes.resume.user.resolve', {
    onSuccess() {
      invalidateResumeQueries();
      gaEvent({
        action: 'resumes.resolve_button_click',
        category: 'engagement',
        label: 'Resolve Resume',
      });
    },
  });

  const invalidateResumeQueries = () => {
    utils.invalidateQueries(['resumes.resume.findOne']);
    utils.invalidateQueries(['resumes.resume.findAll']);
    utils.invalidateQueries(['resumes.resume.user.findUserStarred']);
    utils.invalidateQueries(['resumes.resume.user.findUserCreated']);
  };

  const userIsOwner =
    session?.user?.id !== undefined &&
    session.user.id === detailsQuery.data?.userId;

  const isResumeResolved = detailsQuery.data?.isResolved;

  const [isEditMode, setIsEditMode] = useState(false);
  const [showCommentsForm, setShowCommentsForm] = useState(false);

  const onStarButtonClick = () => {
    if (session?.user?.id == null) {
      router.push(loginPageHref());
      return;
    }

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

  const onInfoTagClick = ({
    locationLabel,
    experienceLabel,
    roleLabel,
  }: {
    experienceLabel?: string;
    locationLabel?: string;
    roleLabel?: string;
  }) => {
    const getFilterValue = (
      label: string,
      filterOptions: Array<
        FilterOption<ExperienceFilter | LocationFilter | RoleFilter>
      >,
    ) => filterOptions.find((option) => option.label === label)?.value;

    router.push({
      pathname: '/resumes',
      query: {
        currentPage: JSON.stringify(1),
        isFiltersOpen: JSON.stringify({
          experience: experienceLabel !== undefined,
          location: locationLabel !== undefined,
          role: roleLabel !== undefined,
        }),
        searchValue: JSON.stringify(''),
        shortcutSelected: JSON.stringify('all'),
        sortOrder: JSON.stringify('latest'),
        tabsValue: JSON.stringify(BROWSE_TABS_VALUES.ALL),
        userFilters: JSON.stringify({
          ...INITIAL_FILTER_STATE,
          ...(locationLabel && {
            location: [getFilterValue(locationLabel, LOCATIONS)],
          }),
          ...(roleLabel && {
            role: [getFilterValue(roleLabel, ROLES)],
          }),
          ...(experienceLabel && {
            experience: [getFilterValue(experienceLabel, EXPERIENCES)],
          }),
        }),
      },
    });
  };

  const onEditButtonClick = () => {
    setIsEditMode(true);
  };

  const onResolveButtonClick = () => {
    resolveMutation.mutate({
      id: resumeId as string,
      val: !isResumeResolved,
    });
  };

  const renderReviewButton = () => {
    if (session === null) {
      return (
        <Button
          className="h-10 shadow-md"
          display="block"
          href={loginPageHref()}
          label="Log in to join discussion"
          variant="primary"
        />
      );
    }
    return (
      <Button
        className="h-10 shadow-md"
        display="block"
        label="Add your review"
        variant="primary"
        onClick={() => setShowCommentsForm(true)}
      />
    );
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
          invalidateResumeQueries();
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
          <main className="h-full flex-1 space-y-2 overflow-y-auto py-4 px-8 xl:px-12 2xl:pr-16">
            <div className="flex justify-between">
              <h1 className="w-[60%] pr-2 text-2xl font-semibold leading-7 text-slate-900">
                {detailsQuery.data.title}
              </h1>
              <div className="flex gap-3 xl:pr-4">
                {userIsOwner && (
                  <>
                    <Button
                      addonPosition="start"
                      className="h-10 shadow-md"
                      icon={PencilSquareIcon}
                      label="Edit"
                      variant="tertiary"
                      onClick={onEditButtonClick}
                    />
                    <button
                      className="isolate inline-flex h-10 items-center space-x-4 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-md hover:bg-slate-50 focus:ring-slate-600 disabled:hover:bg-white"
                      disabled={resolveMutation.isLoading}
                      type="button"
                      onClick={onResolveButtonClick}>
                      <div className="-ml-1 mr-2 h-5 w-5">
                        {resolveMutation.isLoading ? (
                          <Spinner className="mt-0.5" size="xs" />
                        ) : (
                          <CheckCircleIcon
                            aria-hidden="true"
                            className={
                              isResumeResolved
                                ? 'text-slate-500'
                                : 'text-success-600'
                            }
                          />
                        )}
                      </div>
                      {isResumeResolved
                        ? 'Reopen for review'
                        : 'Mark as reviewed'}
                    </button>
                  </>
                )}
                <button
                  className="isolate inline-flex h-10 items-center space-x-4 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-md hover:bg-slate-50 focus:ring-slate-600 disabled:hover:bg-white"
                  disabled={starMutation.isLoading || unstarMutation.isLoading}
                  type="button"
                  onClick={onStarButtonClick}>
                  <div className="-ml-1 mr-2 h-5 w-5">
                    {starMutation.isLoading ||
                    unstarMutation.isLoading ||
                    detailsQuery.isLoading ? (
                      <Spinner className="mt-0.5" size="xs" />
                    ) : (
                      <StarIcon
                        aria-hidden="true"
                        className={clsx(
                          detailsQuery.data?.stars.length
                            ? 'text-orange-400'
                            : 'text-slate-400',
                        )}
                      />
                    )}
                  </div>
                  {detailsQuery.data?.stars.length ? 'Starred' : 'Star'}
                  <span className="relative -ml-px inline-flex">
                    {detailsQuery.data?._count.stars}
                  </span>
                </button>
                <div className="hidden xl:block">{renderReviewButton()}</div>
              </div>
            </div>
            <div className="flex flex-col lg:mt-0 lg:flex-row lg:flex-wrap lg:space-x-8">
              <div className="mt-2 flex items-center text-sm text-slate-600 xl:mt-1">
                <BriefcaseIcon
                  aria-hidden="true"
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-indigo-400"
                />
                <button
                  className="hover:text-primary-800 underline"
                  type="button"
                  onClick={() =>
                    onInfoTagClick({
                      roleLabel: detailsQuery.data?.role,
                    })
                  }>
                  {getFilterLabel(ROLES, detailsQuery.data.role as RoleFilter)}
                </button>
              </div>
              <div className="flex items-center pt-2 text-sm text-slate-600 xl:pt-1">
                <MapPinIcon
                  aria-hidden="true"
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-indigo-400"
                />
                <button
                  className="hover:text-primary-800 underline"
                  type="button"
                  onClick={() =>
                    onInfoTagClick({
                      locationLabel: detailsQuery.data?.location,
                    })
                  }>
                  {getFilterLabel(
                    LOCATIONS,
                    detailsQuery.data.location as LocationFilter,
                  )}
                </button>
              </div>
              <div className="flex items-center pt-2 text-sm text-slate-600 xl:pt-1">
                <AcademicCapIcon
                  aria-hidden="true"
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-indigo-400"
                />
                <button
                  className="hover:text-primary-800 underline"
                  type="button"
                  onClick={() =>
                    onInfoTagClick({
                      experienceLabel: detailsQuery.data?.experience,
                    })
                  }>
                  {getFilterLabel(
                    EXPERIENCES,
                    detailsQuery.data.experience as ExperienceFilter,
                  )}
                </button>
              </div>
              <div className="flex items-center pt-2 text-sm text-slate-600 xl:pt-1">
                <CalendarIcon
                  aria-hidden="true"
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-indigo-400"
                />
                {`Uploaded ${formatDistanceToNow(detailsQuery.data.createdAt, {
                  addSuffix: true,
                })} by ${detailsQuery.data.user.name}`}
              </div>
            </div>
            {detailsQuery.data.additionalInfo && (
              <div className="flex items-start whitespace-pre-wrap pt-2 text-sm text-slate-600 xl:pt-1">
                <InformationCircleIcon
                  aria-hidden="true"
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-indigo-400"
                />
                <ResumeExpandableText
                  key={detailsQuery.data.additionalInfo}
                  text={detailsQuery.data.additionalInfo}
                />
              </div>
            )}

            <div className="flex w-full flex-col gap-6 py-4 xl:flex-row xl:py-0">
              <div className="w-full xl:w-1/2">
                <ResumePdf url={detailsQuery.data.url} />
              </div>
              <div className="grow">
                <div className="mb-6 space-y-4 xl:hidden">
                  {renderReviewButton()}
                  <div className="flex items-center space-x-2">
                    <hr className="flex-grow border-slate-300" />
                    <span className="bg-slate-50 px-3 text-lg font-medium text-slate-900">
                      Reviews
                    </span>
                    <hr className="flex-grow border-slate-300" />
                  </div>
                </div>

                {showCommentsForm ? (
                  <ResumeCommentsForm
                    resumeId={resumeId as string}
                    setShowCommentsForm={setShowCommentsForm}
                  />
                ) : (
                  <ResumeCommentsList resumeId={resumeId as string} />
                )}
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}
