import Error from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';
import { ProfileDetailTab } from '~/components/offers/constants';
import { HOME_URL } from '~/components/offers/constants';
import ProfileComments from '~/components/offers/profile/ProfileComments';
import ProfileDetails from '~/components/offers/profile/ProfileDetails';
import ProfileHeader from '~/components/offers/profile/ProfileHeader';
import type {
  BackgroundDisplayData,
  OfferDisplayData,
} from '~/components/offers/types';
import type { JobTitleType } from '~/components/shared/JobTitles';
import { getLabelForJobTitleType } from '~/components/shared/JobTitles';

import { Spinner, useToast } from '~/ui';
import { convertMoneyToString } from '~/utils/offers/currency';
import { getProfilePath } from '~/utils/offers/link';
import { formatDate } from '~/utils/offers/time';
import { trpc } from '~/utils/trpc';

import type { Profile, ProfileAnalysis, ProfileOffer } from '~/types/offers';

export default function OfferProfile() {
  const { showToast } = useToast();
  const router = useRouter();
  const { offerProfileId, token = '' } = router.query;
  const [isEditable, setIsEditable] = useState(false);
  const [background, setBackground] = useState<BackgroundDisplayData>();
  const [offers, setOffers] = useState<Array<OfferDisplayData>>([]);

  const [selectedTab, setSelectedTab] = useState<ProfileDetailTab>(
    ProfileDetailTab.OFFERS,
  );
  const [analysis, setAnalysis] = useState<ProfileAnalysis>();
  const { data: session } = useSession();
  const { event: gaEvent } = useGoogleAnalytics();

  const getProfileQuery = trpc.useQuery(
    [
      'offers.profile.listOne',
      {
        profileId: offerProfileId as string,
        token: token as string,
        userId: session?.user?.id,
      },
    ],
    {
      enabled: typeof offerProfileId === 'string',
      onSuccess: (data: Profile) => {
        if (!data) {
          router.push(HOME_URL);
        }
        // If the profile is not editable with a wrong token, redirect to the profile page
        if (!data.isEditable && token !== '') {
          router.push(getProfilePath(offerProfileId as string));
        }

        setIsEditable(data.isEditable);

        const filteredOffers: Array<OfferDisplayData> = data
          ? data?.offers.map((res: ProfileOffer) => {
              if (res.offersFullTime) {
                const filteredOffer: OfferDisplayData = {
                  base:
                    res.offersFullTime.baseSalary != null
                      ? convertMoneyToString(res.offersFullTime.baseSalary)
                      : undefined,
                  bonus:
                    res.offersFullTime.bonus != null
                      ? convertMoneyToString(res.offersFullTime.bonus)
                      : undefined,
                  company: res.company,
                  id: res.offersFullTime.id,
                  jobLevel: res.offersFullTime.level,
                  jobTitle: getLabelForJobTitleType(
                    res.offersFullTime.title as JobTitleType,
                  ),
                  jobType: res.jobType,
                  location: res.location,
                  negotiationStrategy: res.negotiationStrategy,
                  otherComment: res.comments,
                  receivedMonth: formatDate(res.monthYearReceived),
                  stocks:
                    res.offersFullTime.stocks != null
                      ? convertMoneyToString(res.offersFullTime.stocks)
                      : undefined,
                  totalCompensation: convertMoneyToString(
                    res.offersFullTime.totalCompensation,
                  ),
                };
                return filteredOffer;
              }
              const filteredOffer: OfferDisplayData = {
                company: res.company,
                id: res.offersIntern!.id,
                internshipCycle: res.offersIntern!.internshipCycle,
                jobTitle: getLabelForJobTitleType(
                  res.offersIntern!.title as JobTitleType,
                ),
                jobType: res.jobType,
                location: res.location,
                monthlySalary: convertMoneyToString(
                  res.offersIntern!.monthlySalary,
                ),
                negotiationStrategy: res.negotiationStrategy,
                otherComment: res.comments,
                receivedMonth: formatDate(res.monthYearReceived),
                startYear: res.offersIntern!.startYear,
              };
              return filteredOffer;
            })
          : [];
        setOffers(filteredOffers);

        if (data?.background) {
          const transformedBackground = {
            educations: data.background.educations.map((education) => ({
              endDate: education.endDate ? formatDate(education.endDate) : null,
              field: education.field,
              school: education.school,
              startDate: education.startDate
                ? formatDate(education.startDate)
                : null,
              type: education.type,
            })),
            experiences: data.background.experiences.map(
              (experience): OfferDisplayData => ({
                company: experience.company,
                duration: experience.durationInMonths,
                jobLevel: experience.level,
                jobTitle: experience.title
                  ? getLabelForJobTitleType(experience.title as JobTitleType)
                  : null,
                jobType: experience.jobType || undefined,
                location: experience.location,
                monthlySalary: experience.monthlySalary
                  ? convertMoneyToString(experience.monthlySalary)
                  : null,
                totalCompensation: experience.totalCompensation
                  ? convertMoneyToString(experience.totalCompensation)
                  : null,
              }),
            ),
            profileName: data.profileName,
            specificYoes: data.background.specificYoes,
            totalYoe: data.background.totalYoe,
          };
          setBackground(transformedBackground);
        }

        if (data.analysis) {
          setAnalysis(data.analysis);
        }
      },
    },
  );

  const trpcContext = trpc.useContext();
  const deleteMutation = trpc.useMutation(['offers.profile.delete'], {
    onError: () => {
      showToast({
        title: `Error deleting offers profile.`,
        variant: 'failure',
      });
    },
    onSuccess: () => {
      trpcContext.invalidateQueries(['offers.profile.listOne']);
      router.push(HOME_URL);
      showToast({
        title: `Offers profile successfully deleted!`,
        variant: 'success',
      });
    },
  });

  function handleDelete() {
    if (isEditable) {
      deleteMutation.mutate({
        profileId: offerProfileId as string,
        token: token as string,
      });
      gaEvent({
        action: 'offers.delete_profile',
        category: 'engagement',
        label: 'Delete profile',
      });
    }
  }

  return getProfileQuery.isError ? (
    <div className="flex w-full justify-center">
      <Error statusCode={404} title="Requested profile does not exist." />
    </div>
  ) : getProfileQuery.isLoading ? (
    <div className="flex h-screen w-full items-center justify-center text-slate-500">
      <div className="flex flex-col gap-2">
        <Spinner display="block" size="lg" />
        <p className="text-center">Loading profile...</p>
      </div>
    </div>
  ) : (
    <>
      <Head>
        <title>
          {background?.profileName ? background.profileName : 'View profile'}
        </title>
      </Head>
      <div className="w-full divide-x lg:flex">
        <div className="divide-y lg:w-2/3">
          <div className="h-fit">
            <ProfileHeader
              background={background}
              handleDelete={handleDelete}
              isEditable={isEditable}
              isLoading={getProfileQuery.isLoading}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </div>
          <div>
            <ProfileDetails
              analysis={analysis}
              background={background}
              isEditable={isEditable}
              isLoading={getProfileQuery.isLoading}
              offers={offers}
              profileId={offerProfileId as string}
              selectedTab={selectedTab}
            />
          </div>
        </div>
        <div
          className="bg-white lg:fixed lg:right-0 lg:bottom-0 lg:w-1/3"
          style={{ top: 64 }}>
          <ProfileComments
            isDisabled={deleteMutation.isLoading}
            isEditable={isEditable}
            isLoading={getProfileQuery.isLoading}
            profileId={offerProfileId as string}
            profileName={background?.profileName}
            token={token as string}
          />
        </div>
      </div>
    </>
  );
}
