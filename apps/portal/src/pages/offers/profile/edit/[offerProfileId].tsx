import { useRouter } from 'next/router';
import { useState } from 'react';
import { JobType } from '@prisma/client';

import OffersSubmissionForm from '~/components/offers/offersSubmission/OffersSubmissionForm';
import type { OffersProfileFormData } from '~/components/offers/types';

import { Spinner } from '~/../../../packages/ui/dist';
import { getProfilePath } from '~/utils/offers/link';
import { convertToMonthYear } from '~/utils/offers/time';
import { trpc } from '~/utils/trpc';

export default function OffersEditPage() {
  const [initialData, setInitialData] = useState<OffersProfileFormData>();
  const router = useRouter();
  const { offerProfileId, token = '' } = router.query;

  const getProfileResult = trpc.useQuery(
    [
      'offers.profile.listOne',
      { profileId: offerProfileId as string, token: token as string },
    ],
    {
      onError(error) {
        console.error(error.message);
      },
      onSuccess(data) {
        const { educations, experiences, specificYoes, totalYoe, id } =
          data.background!;

        setInitialData({
          background: {
            educations,
            experiences:
              experiences.length === 0
                ? [{ jobType: JobType.FULLTIME }]
                : experiences.map((exp) => ({
                    companyId: exp.company?.id,
                    durationInMonths: exp.durationInMonths,
                    id: exp.id,
                    jobType: exp.jobType,
                    level: exp.level,
                    location: exp.location,
                    monthlySalary: exp.monthlySalary,
                    title: exp.title,
                    totalCompensation: exp.totalCompensation,
                  })),
            id,
            specificYoes,
            totalYoe,
          },
          id: data.id,
          offers: data.offers.map((offer) => ({
            comments: offer.comments,
            companyId: offer.company.id,
            id: offer.id,
            jobType: offer.jobType,
            location: offer.location,
            monthYearReceived: convertToMonthYear(offer.monthYearReceived),
            negotiationStrategy: offer.negotiationStrategy,
            offersFullTime: offer.offersFullTime,
            offersIntern: offer.offersIntern,
          })),
        });
      },
    },
  );

  const profile = getProfileResult.data;

  if (profile && !profile.isEditable) {
    router.push(getProfilePath(profile.id));
  }

  return (
    <>
      {getProfileResult.isLoading && (
        <div className="flex w-full justify-center">
          <Spinner className="m-10" display="block" size="lg" />
        </div>
      )}
      {!getProfileResult.isLoading && initialData && (
        <OffersSubmissionForm
          initialOfferProfileValues={initialData}
          profileId={profile?.id}
          token={profile?.editToken || undefined}
        />
      )}
    </>
  );
}
