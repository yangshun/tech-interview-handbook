import {
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid';
import {
  ArrowTopRightOnSquareIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import { JobType } from '@prisma/client';

import CompanyProfileImage from '~/components/shared/CompanyProfileImage';
import type { JobTitleType } from '~/components/shared/JobTitles';
import { getLabelForJobTitleType } from '~/components/shared/JobTitles';

import { Button } from '~/ui';
import { convertMoneyToString } from '~/utils/offers/currency';
import { formatDate } from '~/utils/offers/time';

import { JobTypeLabel } from '../constants';
import ProfilePhotoHolder from '../profile/ProfilePhotoHolder';

import type { AnalysisOffer } from '~/types/offers';

type OfferProfileCardProps = Readonly<{
  offerProfile: AnalysisOffer;
}>;

export default function OfferProfileCard({
  offerProfile: {
    company,
    income,
    profileName,
    totalYoe,
    level,
    monthYearReceived,
    jobType,
    location,
    title,
    previousCompanies,
    profileId,
  },
}: OfferProfileCardProps) {
  function UpperSection() {
    return (
      <div className="border-b px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ProfilePhotoHolder size="sm" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium leading-6 text-slate-900">
                  {profileName}
                </h2>
                <p className="flex text-sm text-slate-500">
                  <CalendarDaysIcon className="mr-2 h-5" />
                  <span className="mr-2 font-bold">YOE:</span>
                  <span>{totalYoe}</span>
                  {previousCompanies.length > 0 && (
                    <>
                      <BuildingOffice2Icon className="ml-4 mr-2 h-5" />
                      <span className="mr-2 font-bold">Previous:</span>
                      <span>{previousCompanies[0]}</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="ml-4 mt-4 flex flex-shrink-0">
            <Button
              href={`/offers/profile/${profileId}`}
              icon={ArrowTopRightOnSquareIcon}
              isLabelHidden={true}
              label="View Profile"
              rel="noreferrer"
              size="md"
              target="_blank"
              variant="tertiary"
            />
          </div>
        </div>
      </div>
    );
  }

  function BottomSection() {
    return (
      <div className="px-4 py-4 sm:px-6">
        <div className="flex justify-between gap-4">
          <CompanyProfileImage
            alt={company.name}
            className="hidden h-10 w-10 object-contain sm:block"
            src={company.logoUrl}
          />
          <div className="grow">
            <h4 className="font-medium">
              {getLabelForJobTitleType(title as JobTitleType)}{' '}
              {jobType && <>({JobTypeLabel[jobType]})</>}
            </h4>
            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-4">
              {company?.name && (
                <div className="mt-2 flex items-center text-sm text-slate-500">
                  <BuildingOfficeIcon
                    aria-hidden="true"
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
                  />
                  {company.name}
                </div>
              )}
              {location && (
                <div className="mt-2 flex items-center text-sm text-slate-500">
                  <MapPinIcon
                    aria-hidden="true"
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
                  />
                  {location.cityName}
                </div>
              )}
              {level && (
                <div className="mt-2 flex items-center text-sm text-slate-500">
                  <ArrowTrendingUpIcon
                    aria-hidden="true"
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
                  />
                  {level}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-end text-lg font-medium leading-6 text-slate-900">
              {jobType === JobType.FULLTIME
                ? `${convertMoneyToString(income)} / year`
                : `${convertMoneyToString(income)} / month`}
            </p>
            <p className="text-end text-sm text-slate-500">
              {formatDate(monthYearReceived)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-5 block rounded-lg border border-slate-200 bg-white">
      <UpperSection />
      <BottomSection />
    </div>
  );
}
