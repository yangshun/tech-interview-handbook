import Error from 'next/error';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  AcademicCapIcon,
  BookmarkSquareIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  ClipboardDocumentIcon,
  PencilSquareIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Button, Dialog, Tabs } from '@tih/ui';

import EducationCard from '~/components/offers/profile/EducationCard';
import type { OfferEntity } from '~/components/offers/profile/OfferCard';
import OfferCard from '~/components/offers/profile/OfferCard';
import ProfilePhotoHolder from '~/components/offers/profile/ProfilePhotoHolder';
import type { BackgroundCard } from '~/components/offers/types';
import { EducationBackgroundType } from '~/components/offers/types';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const detailsQuery = trpc.useQuery(
    [
      'offers.profile.listOne',
      { profileId: offerProfileId as string, token: token as string },
    ],
    {
      enabled: typeof offerProfileId === 'string',
      onSuccess: (data) => {
        const filteredOffers: Array<OfferEntity> = data!.offers.map((res) => {
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
        });

        setOffers(filteredOffers ?? []);

        if (data?.background) {
          const filteredBackground: BackgroundCard = {
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

          setBackground(filteredBackground);
        }

        setIsEditable(data?.isEditable ?? false);
      },
    },
  );

  function renderActionList() {
    return (
      <div className="space-x-2">
        <Button
          icon={BookmarkSquareIcon}
          isLabelHidden={true}
          label="Save to user account"
          size="md"
          variant="tertiary"
        />
        <Button
          icon={PencilSquareIcon}
          isLabelHidden={true}
          label="Edit"
          size="md"
          variant="tertiary"
        />
        <Button
          icon={TrashIcon}
          isLabelHidden={true}
          label="Delete"
          size="md"
          variant="tertiary"
          onClick={() => setIsDialogOpen(true)}
        />
        {isDialogOpen && (
          <Dialog
            isShown={isDialogOpen}
            primaryButton={
              <Button
                display="block"
                label="Delete"
                variant="primary"
                onClick={() => setIsDialogOpen(false)}
              />
            }
            secondaryButton={
              <Button
                display="block"
                label="Cancel"
                variant="tertiary"
                onClick={() => setIsDialogOpen(false)}
              />
            }
            title="Are you sure you want to delete this offer profile?"
            onClose={() => setIsDialogOpen(false)}>
            <div>
              All comments will be gone. You will not be able to access or
              recover it.
            </div>
          </Dialog>
        )}
      </div>
    );
  }
  function ProfileHeader() {
    return (
      <div className="relative h-40 bg-white p-4">
        <div className="justify-left flex h-1/2">
          <div className="mx-4 mt-2">
            <ProfilePhotoHolder />
          </div>
          <div className="w-full">
            <div className="justify-left flex ">
              <h2 className="flex w-4/5 text-2xl font-bold">
                {background?.profileName ?? 'anonymous'}
              </h2>
              {isEditable && (
                <div className="flex h-8 w-1/5 justify-end">
                  {isEditable && renderActionList()}
                </div>
              )}
            </div>
            <div className="flex flex-row">
              <BuildingOffice2Icon className="mr-2.5 h-5" />
              <span className="mr-2 font-bold">Current:</span>
              <span>{`${background?.experiences[0].companyName ?? '-'} ${
                background?.experiences[0].jobLevel
              } ${background?.experiences[0].jobTitle}`}</span>
            </div>
            <div className="flex flex-row">
              <CalendarDaysIcon className="mr-2.5 h-5" />
              <span className="mr-2 font-bold">YOE:</span>
              <span className="mr-4">{background?.totalYoe}</span>
              {background?.specificYoes &&
                background?.specificYoes.length > 0 &&
                background?.specificYoes.map(({ domain, yoe }) => (
                  <>
                    <span
                      key={domain}
                      className="mr-2">{`${domain} : ${yoe}`}</span>
                    <span>{background?.totalYoe}</span>
                  </>
                ))}
            </div>
          </div>
        </div>

        <div className="absolute left-8 bottom-1 content-center">
          <Tabs
            label="Profile Detail Navigation"
            tabs={[
              {
                label: 'Offers',
                value: 'offers',
              },
              {
                label: 'Background',
                value: 'background',
              },
              {
                label: 'Offer Engine Analysis',
                value: 'offerEngineAnalysis',
              },
            ]}
            value={selectedTab}
            onChange={(value) => setSelectedTab(value)}
          />
        </div>
      </div>
    );
  }

  function ProfileDetails() {
    if (selectedTab === 'offers') {
      return (
        <>
          {[...offers].map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </>
      );
    }
    if (selectedTab === 'background') {
      return (
        <>
          {background?.experiences && background?.experiences.length > 0 && (
            <>
              <div className="mx-8 my-4 flex flex-row">
                <BriefcaseIcon className="mr-1 h-5" />
                <span className="font-bold">Work Experience</span>
              </div>
              <OfferCard offer={background?.experiences[0]} />
            </>
          )}
          {background?.educations && background?.educations.length > 0 && (
            <>
              <div className="mx-8 my-4 flex flex-row">
                <AcademicCapIcon className="mr-1 h-5" />
                <span className="font-bold">Education</span>
              </div>
              <EducationCard
                education={{
                  endDate: background.educations[0].endDate,
                  field: background.educations[0].field,
                  school: background.educations[0].school,
                  startDate: background.educations[0].startDate,
                  type: EducationBackgroundType.Bachelor,
                }}
              />
            </>
          )}
        </>
      );
    }
    return <div>Detail page for {selectedTab}</div>;
  }

  function ProfileComments() {
    return (
      <div className="m-4">
        <div className="flex-end flex justify-end space-x-4">
          {isEditable && (
            <Button
              addonPosition="start"
              icon={ClipboardDocumentIcon}
              isLabelHidden={false}
              label="Copy profile edit link"
              size="sm"
              variant="secondary"
              onClick={() => {
                // TODO: Add notification
                navigator.clipboard.writeText(
                  `${router.pathname}/${offerProfileId}?token=${token}`,
                );
              }}
            />
          )}
          <Button
            addonPosition="start"
            icon={ShareIcon}
            isLabelHidden={false}
            label="Copy public link"
            size="sm"
            variant="secondary"
            onClick={() => {
              // TODO: Add notification
              navigator.clipboard.writeText(
                `${window.location.origin}/offers/profile/${offerProfileId}`,
              );
            }}
          />
        </div>
        <h2 className="mt-2 text-2xl font-bold">
          Discussions feature coming soon
        </h2>
        {/* <TextArea label="Comment" placeholder="Type your comment here" /> */}
      </div>
    );
  }

  return (
    <>
      {detailsQuery.isError && ErrorPage}
      <div className="mb-4 flex flex h-screen w-screen items-center justify-center divide-x">
        <div className="h-full w-2/3 divide-y">
          <ProfileHeader />
          <div className="h-4/5 w-full overflow-y-scroll pb-32">
            <ProfileDetails />
          </div>
        </div>
        <div className="h-full w-1/3 bg-white">
          <ProfileComments />
        </div>
      </div>
    </>
  );
}
