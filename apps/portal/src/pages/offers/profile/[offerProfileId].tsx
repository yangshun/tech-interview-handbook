import Error from 'next/error';
import { useRouter } from 'next/router';
import { useState } from 'react';

import ProfileComments from '~/components/offers/profile/ProfileComments';
import ProfileDetails from '~/components/offers/profile/ProfileDetails';
import ProfileHeader from '~/components/offers/profile/ProfileHeader';
import type { OfferEntity } from '~/components/offers/types';
import type { BackgroundCard } from '~/components/offers/types';

import { formatDate } from '~/utils/offers/time';
import { trpc } from '~/utils/trpc';
export default function OfferProfile() {
  const ErrorPage = (
    <Error statusCode={404} title="Requested profile does not exist." />
  );
  const router = useRouter();
  const { offerProfileId, token = '' } = router.query;
  const [isEditable, setIsEditable] = useState(false);
  const [background, setBackground] = useState<BackgroundCard>();
  const [offers, setOffers] = useState<Array<OfferEntity>>([]);

  const [selectedTab, setSelectedTab] = useState('offers');

  const getProfileQuery = trpc.useQuery(
    [
      'offers.profile.listOne',
      { profileId: offerProfileId as string, token: token as string },
    ],
    {
      enabled: typeof offerProfileId === 'string',
      onSuccess: (data) => {
        if (!data) {
          router.push('/offers');
        }
        if (!data?.isEditable && token !== '') {
          router.push(`/offers/profile/${offerProfileId}`);
        }

        setIsEditable(data?.isEditable ?? false);

        const filteredOffers: Array<OfferEntity> = data
          ? data?.offers.map((res) => {
              if (res.OffersFullTime) {
                const filteredOffer: OfferEntity = {
                  base: res.OffersFullTime.baseSalary.value
                    ? `${res.OffersFullTime.baseSalary.value} ${res.OffersFullTime.baseSalary.currency}`
                    : '',
                  bonus: res.OffersFullTime.bonus.value
                    ? `${res.OffersFullTime.bonus.value} ${res.OffersFullTime.bonus.currency}`
                    : '',
                  companyName: res.company.name,
                  id: res.OffersFullTime.id,
                  jobLevel: res.OffersFullTime.level,
                  jobTitle: res.OffersFullTime.title,
                  location: res.location,
                  negotiationStrategy: res.negotiationStrategy || '',
                  otherComment: res.comments || '',
                  receivedMonth: formatDate(res.monthYearReceived),
                  stocks: res.OffersFullTime.stocks.value
                    ? `${res.OffersFullTime.stocks.value} ${res.OffersFullTime.stocks.currency}`
                    : '',
                  totalCompensation: res.OffersFullTime.totalCompensation.value
                    ? `${res.OffersFullTime.totalCompensation.value} ${res.OffersFullTime.totalCompensation.currency}`
                    : '',
                };

                return filteredOffer;
              }
              const filteredOffer: OfferEntity = {
                companyName: res.company.name,
                id: res.OffersIntern!.id,
                jobTitle: res.OffersIntern!.title,
                location: res.location,
                monthlySalary: res.OffersIntern!.monthlySalary.value
                  ? `${res.OffersIntern!.monthlySalary.value} ${
                      res.OffersIntern!.monthlySalary.currency
                    }`
                  : '',
                negotiationStrategy: res.negotiationStrategy || '',
                otherComment: res.comments || '',
                receivedMonth: formatDate(res.monthYearReceived),
              };
              return filteredOffer;
            })
          : [];
        setOffers(filteredOffers);

        if (data?.background) {
          const transformedBackground = {
            educations: [
              {
                endDate: data?.background.educations[0].endDate
                  ? formatDate(data.background.educations[0].endDate)
                  : '-',
                field: data.background.educations[0].field || '-',
                school: data.background.educations[0].school || '-',
                startDate: data.background.educations[0].startDate
                  ? formatDate(data.background.educations[0].startDate)
                  : '-',
                type: data.background.educations[0].type || '-',
              },
            ],
            experiences: [
              {
                companyName:
                  data.background.experiences[0].company?.name ?? '-',
                duration:
                  String(data.background.experiences[0].durationInMonths) ??
                  '-',
                jobLevel: data.background.experiences[0].level ?? '',
                jobTitle: data.background.experiences[0].title ?? '-',
                monthlySalary: data.background.experiences[0].monthlySalary
                  ?.value
                  ? `${data.background.experiences[0].monthlySalary?.value} ${data.background.experiences[0].monthlySalary?.currency}`
                  : `-`,
                totalCompensation: data.background.experiences[0]
                  .totalCompensation?.value
                  ? `${data.background.experiences[0].totalCompensation?.value} ${data.background.experiences[0].totalCompensation?.currency}`
                  : ``,
              },
            ],
            profileName: data.profileName,
            specificYoes: data.background.specificYoes ?? [],
            totalYoe: String(data.background.totalYoe) || '-',
          };
          setBackground(transformedBackground);
        }
      },
    },
  );

  const trpcContext = trpc.useContext();
  const deleteMutation = trpc.useMutation(['offers.profile.delete']);

  function handleDelete() {
    if (isEditable) {
      deleteMutation.mutate({
        id: offerProfileId as string,
        // TODO: token: token as string,
      });
      trpcContext.invalidateQueries(['offers.profile.listOne']);
      router.push('/offers');
    }
  }

  function handleCopyEditLink() {
    // TODO: Add notification
    navigator.clipboard.writeText(
      `${window.location.origin}/offers/profile/${offerProfileId}?token=${token}`,
    );
  }

  function handleCopyPublicLink() {
    navigator.clipboard.writeText(
      `${window.location.origin}/offers/profile/${offerProfileId}`,
    );
  }

  return (
    <>
      {getProfileQuery.isError && ErrorPage}
      {!getProfileQuery.isError && (
        <div className="mb-4 flex flex h-screen w-screen items-center justify-center divide-x">
          <div className="h-full w-2/3 divide-y">
            <ProfileHeader
              background={background}
              handleDelete={handleDelete}
              isEditable={isEditable}
              isLoading={getProfileQuery.isLoading}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
            <div className="h-4/5 w-full overflow-y-scroll pb-32">
              <ProfileDetails
                background={background}
                isLoading={getProfileQuery.isLoading}
                offers={offers}
                selectedTab={selectedTab}
              />
            </div>
          </div>
          <div className="h-full w-1/3 bg-white">
            <ProfileComments
              handleCopyEditLink={handleCopyEditLink}
              handleCopyPublicLink={handleCopyPublicLink}
              isDisabled={deleteMutation.isLoading}
              isEditable={isEditable}
              isLoading={getProfileQuery.isLoading}
            />
          </div>
        </div>
      )}
    </>
  );
}
