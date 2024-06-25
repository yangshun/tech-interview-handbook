import axios from 'axios';
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
  TrashIcon,
} from '@heroicons/react/20/solid';
import { Button, Dialog, Spinner } from '~/ui';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';
import ResumeCommentsForm from '~/components/resumes/comments/ResumeCommentsForm';
import ResumeCommentsList from '~/components/resumes/comments/ResumeCommentsList';
import ResumePdf from '~/components/resumes/ResumePdf';
import ResumeExpandableText from '~/components/resumes/shared/ResumeExpandableText';
import loginPageHref from '~/components/shared/loginPageHref';

import { RESUME_STORAGE_KEY } from '~/constants/file-storage-keys';
import {
  BROWSE_TABS_VALUES,
  getFilterLabel,
  getTypeaheadOption,
  INITIAL_FILTER_STATE,
} from '~/utils/resumes/resumeFilters';
import { trpc } from '~/utils/trpc';

import SubmitResumeForm from './submit';
import type { JobTitleType } from '../../components/shared/JobTitles';
import { getLabelForJobTitleType } from '../../components/shared/JobTitles';

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
  const deleteResumeMutation = trpc.useMutation('resumes.resume.user.delete', {
    onSuccess() {
      invalidateResumeQueries();
      gaEvent({
        action: 'resumes.delete_button_click',
        category: 'engagement',
        label: 'Delete Resume',
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
  const [isDeleteMode, setIsDeleteMode] = useState(false);
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
    locationName,
    locationValue,
    experienceValue,
    roleValue,
  }: {
    experienceValue?: string;
    locationName?: string;
    locationValue?: string;
    roleValue?: string;
  }) => {
    router.push({
      pathname: '/resumes',
      query: {
        currentPage: JSON.stringify(1),
        isFiltersOpen: JSON.stringify({
          experience: experienceValue !== undefined,
          location: locationValue !== undefined,
          role: roleValue !== undefined,
        }),
        searchValue: JSON.stringify(''),
        shortcutSelected: JSON.stringify('all'),
        sortOrder: JSON.stringify('latest'),
        tabsValue: JSON.stringify(BROWSE_TABS_VALUES.ALL),
        userFilters: JSON.stringify({
          ...INITIAL_FILTER_STATE,
          ...(locationValue && {
            location: [
              getTypeaheadOption('location', locationValue, locationName),
            ],
          }),
          ...(roleValue && {
            role: [getTypeaheadOption('role', roleValue)],
          }),
          ...(experienceValue && {
            experience: [getTypeaheadOption('experience', experienceValue)],
          }),
        }),
      },
    });
  };

  const onEditButtonClick = () => {
    setIsEditMode(true);
  };

  const onDeleteButtonClick = () => {
    setIsDeleteMode(true);
  };

  const onDeleteDialog = async () => {
    return deleteResumeMutation.mutate(
      { id: resumeId as string },
      {
        async onSuccess() {
          // Delete from file storage
          if (detailsQuery.data != null) {
            await axios.delete(
              `/api/file-storage?key=${RESUME_STORAGE_KEY}&fileUrl=${detailsQuery.data.url}`,
            );
          }

          // Redirect to browse with default settings
          router.push({
            pathname: '/resumes',
            query: {
              currentPage: JSON.stringify(1),
              isFiltersOpen: JSON.stringify({
                experience: false,
                location: false,
                role: false,
              }),
              searchValue: JSON.stringify(''),
              shortcutSelected: JSON.stringify('all'),
              sortOrder: JSON.stringify('latest'),
              tabsValue: JSON.stringify(BROWSE_TABS_VALUES.ALL),
              userFilters: JSON.stringify(INITIAL_FILTER_STATE),
            },
          });
        },
      },
    );
  };

  const onCancelDialog = () => {
    setIsDeleteMode(false);
  };

  const onResolveButtonClick = () => {
    resolveMutation.mutate({
      id: resumeId as string,
      val: !isResumeResolved,
    });
  };

  const renderReviewButton = () => {
    if (session == null) {
      return (
        <Button
          display="block"
          href={loginPageHref()}
          label="Sign in to comment"
          variant="primary"
        />
      );
    }

    return (
      <Button
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
          location: {
            id: detailsQuery.data.locationId,
            label: detailsQuery.data.location.name,
            value: detailsQuery.data.locationId,
          },
          resumeId: resumeId as string,
          role: {
            id: detailsQuery.data.role,
            label: getLabelForJobTitleType(
              detailsQuery.data.role as JobTitleType,
            ),
            value: detailsQuery.data.role,
          },
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
      {/* Has to strict quality check (===), don't change it to ==  */}
      {(detailsQuery.isError || detailsQuery.data === null) && ErrorPage}
      {(detailsQuery.isLoading || deleteResumeMutation.isLoading) && (
        <div className="w-full pt-4">
          <Spinner display="block" size="lg" />
        </div>
      )}
      {detailsQuery.isFetched && detailsQuery.data && (
        <>
          <Head>
            <title>{`${detailsQuery.data.title} | Resume Review`}</title>
          </Head>
          <main className="flex h-[calc(100vh-4rem)] w-full flex-col bg-white">
            <div className="mx-auto w-full space-y-4 border-b border-slate-200 px-4 py-6 sm:px-6 lg:px-8">
              <div className="justify-between gap-4 space-y-4 lg:flex lg:space-y-0">
                <h1 className="pr-2 text-xl font-medium leading-7 text-slate-900">
                  {detailsQuery.data.title}
                </h1>
                <div className="flex gap-3">
                  {userIsOwner && (
                    <>
                      <div>
                        <Button
                          addonPosition="start"
                          icon={PencilSquareIcon}
                          label="Edit"
                          variant="tertiary"
                          onClick={onEditButtonClick}
                        />
                      </div>
                      <div>
                        <Button
                          addonPosition="start"
                          className="hover:text-red-500"
                          icon={TrashIcon}
                          label="Delete"
                          variant="tertiary"
                          onClick={onDeleteButtonClick}
                        />
                      </div>
                      <div>
                        <button
                          className="isolate inline-flex items-center space-x-4 whitespace-nowrap rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:ring-slate-600 disabled:hover:bg-white"
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
                      </div>
                    </>
                  )}
                  <div>
                    <button
                      className="isolate inline-flex items-center space-x-4 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:ring-slate-600 disabled:hover:bg-white"
                      disabled={
                        starMutation.isLoading || unstarMutation.isLoading
                      }
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
                  </div>
                  <div className="hidden lg:block">{renderReviewButton()}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-wrap lg:space-x-8">
                  <div className="col-span-1 flex items-center text-xs text-slate-600 sm:text-sm">
                    <BriefcaseIcon
                      aria-hidden="true"
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-indigo-400"
                    />
                    <button
                      className="hover:text-primary-800 underline"
                      type="button"
                      onClick={() =>
                        onInfoTagClick({
                          roleValue: detailsQuery.data?.role,
                        })
                      }>
                      {getFilterLabel('role', detailsQuery.data.role)}
                    </button>
                  </div>
                  <div className="col-span-1 flex items-center text-xs text-slate-600 sm:text-sm">
                    <MapPinIcon
                      aria-hidden="true"
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-indigo-400"
                    />
                    <button
                      className="hover:text-primary-800 underline"
                      type="button"
                      onClick={() =>
                        onInfoTagClick({
                          locationName: detailsQuery.data?.location.name,
                          locationValue: detailsQuery.data?.locationId,
                        })
                      }>
                      {detailsQuery.data?.location.name}
                    </button>
                  </div>
                  <div className="col-span-1 flex items-center text-xs text-slate-600 sm:text-sm">
                    <AcademicCapIcon
                      aria-hidden="true"
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-indigo-400"
                    />
                    <button
                      className="hover:text-primary-800 underline"
                      type="button"
                      onClick={() =>
                        onInfoTagClick({
                          experienceValue: detailsQuery.data?.experience,
                        })
                      }>
                      {getFilterLabel(
                        'experience',
                        detailsQuery.data.experience,
                      )}
                    </button>
                  </div>
                  <div className="col-span-1 flex items-center text-xs text-slate-600 sm:text-sm">
                    <CalendarIcon
                      aria-hidden="true"
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-indigo-400"
                    />
                    {`Uploaded ${formatDistanceToNow(
                      detailsQuery.data.createdAt,
                      {
                        addSuffix: true,
                      },
                    )} by ${detailsQuery.data.user.name}`}
                  </div>
                </div>
                {detailsQuery.data.additionalInfo && (
                  <div className="col-span-2 flex items-start whitespace-pre-wrap text-slate-600 lg:pt-1">
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
              </div>
            </div>
            <div className="flex w-full shrink-0 grow flex-col divide-x divide-slate-200 overflow-hidden lg:h-0 lg:flex-row lg:py-0">
              <div className="w-full bg-slate-100 lg:h-full lg:w-1/2">
                <ResumePdf url={detailsQuery.data.url} />
              </div>
              <div className="grow overflow-y-auto border-t border-slate-200 bg-slate-50 pb-4 lg:h-full lg:border-t-0 lg:pb-0">
                <div className="divide-y divide-slate-200 lg:hidden">
                  <div className="bg-white p-4 lg:p-0">
                    {renderReviewButton()}
                  </div>
                  {!showCommentsForm && (
                    <div className="p-4 lg:p-0">
                      <h2 className="text-xl font-medium text-slate-900">
                        Reviews
                      </h2>
                    </div>
                  )}
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

            {/* Delete resume dialog */}
            <Dialog
              isShown={isDeleteMode}
              primaryButton={
                <Button
                  disabled={deleteResumeMutation.isLoading}
                  display="block"
                  isLoading={deleteResumeMutation.isLoading}
                  label="Delete"
                  variant="danger"
                  onClick={onDeleteDialog}
                />
              }
              secondaryButton={
                <Button
                  disabled={deleteResumeMutation.isLoading}
                  display="block"
                  label="Cancel"
                  variant="tertiary"
                  onClick={onCancelDialog}
                />
              }
              title="Are you sure?"
              onClose={() => setIsDeleteMode(false)}>
              <div>
                Note that deleting this resume will delete all its contents as
                well. This action is also irreversible! Please check before
                confirming!
              </div>
            </Dialog>
          </main>
        </>
      )}
    </>
  );
}
