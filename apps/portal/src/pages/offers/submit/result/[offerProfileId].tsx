import Error from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Button, Spinner } from '~/ui';

import type { BreadcrumbStep } from '~/components/offers/Breadcrumbs';
import { Breadcrumbs } from '~/components/offers/Breadcrumbs';
import OffersProfileSave from '~/components/offers/offersSubmission/OffersProfileSave';
import OffersSubmissionAnalysis from '~/components/offers/offersSubmission/OffersSubmissionAnalysis';

import { getProfilePath } from '~/utils/offers/link';
import { trpc } from '~/utils/trpc';

export default function OffersSubmissionResult() {
  const router = useRouter();
  let { offerProfileId, token = '' } = router.query;
  offerProfileId = offerProfileId as string;
  token = token as string;
  const [step, setStep] = useState(0);
  const { data: session } = useSession();

  const pageRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () =>
    pageRef.current?.scrollTo({ behavior: 'smooth', top: 0 });

  const checkToken = trpc.useQuery([
    'offers.profile.isValidToken',
    { profileId: offerProfileId, token },
  ]);

  const getAnalysis = trpc.useQuery([
    'offers.analysis.get',
    { profileId: offerProfileId },
  ]);

  const isSavedQuery = trpc.useQuery([
    `offers.profile.isSaved`,
    { profileId: offerProfileId, userId: session?.user?.id },
  ]);

  const steps = [
    <OffersProfileSave
      key={0}
      isSavedQuery={isSavedQuery}
      profileId={offerProfileId}
      token={token}
    />,
    <OffersSubmissionAnalysis
      key={1}
      analysis={getAnalysis.data}
      isError={getAnalysis.isError}
      isLoading={getAnalysis.isLoading}
    />,
  ];

  const breadcrumbSteps: Array<BreadcrumbStep> = [
    {
      label: 'Offers',
    },
    {
      label: 'Background',
    },
    {
      label: 'Save profile',
      step: 0,
    },
    {
      label: 'Analysis',
      step: 1,
    },
  ];

  useEffect(() => {
    scrollToTop();
  }, [step]);

  return checkToken.isLoading || getAnalysis.isLoading ? (
    <div className="flex h-screen w-screen">
      <div className="m-auto mx-auto w-screen justify-center font-medium text-slate-500">
        <Spinner display="block" size="lg" />
        <div className="text-center">Loading results...</div>
      </div>
    </div>
  ) : checkToken.isError || getAnalysis.isError ? (
    <Error statusCode={404} title="Error loading page" />
  ) : checkToken.isSuccess && !checkToken.data ? (
    <Error
      statusCode={403}
      title="You do not have permissions to access this page"
    />
  ) : (
    <>
      <Head>
        <title>View the result</title>
      </Head>
      <div ref={pageRef} className="w-full">
        <div className="flex justify-center">
          <div className="block w-full max-w-screen-md overflow-hidden rounded-lg sm:shadow-lg md:my-10">
            <div className="flex justify-center bg-slate-100 px-4 py-4 sm:px-6 lg:px-8">
              <Breadcrumbs
                currentStep={step}
                setStep={setStep}
                steps={breadcrumbSteps}
              />
            </div>
            <div className="bg-white p-6 sm:p-10">
              {steps[step]}
              {step === 0 && (
                <div className="flex justify-end">
                  <Button
                    disabled={false}
                    icon={ArrowRightIcon}
                    label="Next"
                    variant="primary"
                    onClick={() => setStep(step + 1)}
                  />
                </div>
              )}
              {step === 1 && (
                <div className="flex items-center justify-between">
                  <Button
                    addonPosition="start"
                    icon={ArrowLeftIcon}
                    label="Previous"
                    variant="secondary"
                    onClick={() => setStep(step - 1)}
                  />
                  <Button
                    href={getProfilePath(
                      offerProfileId as string,
                      token as string,
                    )}
                    icon={EyeIcon}
                    label="View your profile"
                    variant="primary"
                  />
                </div>
              )}
            </div>
            <div className="px-6 py-2 text-end sm:px-10">
              <a
                className="text-xs text-slate-500"
                href="https://clearbit.com"
                rel="noreferrer"
                target="_blank">
                Logos provided by Clearbit
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
