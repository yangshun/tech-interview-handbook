import {
  BuildingOffice2Icon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import { JobType } from '@prisma/client';

import type { JobTitleType } from '~/components/shared/JobTitles';
import { getLabelForJobTitleType } from '~/components/shared/JobTitles';

import { HorizontalDivider } from '~/../../../packages/ui/dist';
import { convertMoneyToString } from '~/utils/offers/currency';
import { formatDate } from '~/utils/offers/time';

import ProfilePhotoHolder from '../profile/ProfilePhotoHolder';
import { JobTypeLabel } from '../types';

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
  },
}: OfferProfileCardProps) {
  return (
    // <a
    //   className="my-5 block rounded-lg bg-white p-4 px-8  shadow-md"
    //   href={`/offers/profile/${id}`}
    //   rel="noreferrer"
    //   target="_blank">
    <div className="my-5 block rounded-lg bg-white p-4 px-8  shadow-lg">
      <div className="flex items-center gap-x-5">
        <div>
          <ProfilePhotoHolder size="sm" />
        </div>
        <div className="col-span-10">
          <p className="font-bold">{profileName}</p>
          <div className="flex flex-row">
            <BuildingOffice2Icon className="mr-2 h-5" />
            <span className="mr-2 font-bold">Current:</span>
            <span>{previousCompanies[0]}</span>
          </div>
          <div className="flex flex-row">
            <CalendarDaysIcon className="mr-2 h-5" />
            <span className="mr-2 font-bold">YOE:</span>
            <span>{totalYoe}</span>
          </div>
        </div>
      </div>

      <HorizontalDivider />
      <div className="flex items-end justify-between">
        <div className="col-span-1 row-span-3">
          <p className="font-bold">
            {getLabelForJobTitleType(title as JobTitleType)}{' '}
            {`(${JobTypeLabel[jobType]})`}
          </p>
          <p>
            Company: {company.name}, {location}
          </p>
          {level && <p>Level: {level}</p>}
        </div>
        <div className="col-span-1 row-span-3">
          <p className="text-end">{formatDate(monthYearReceived)}</p>
          <p className="text-end text-xl">
            {jobType === JobType.FULLTIME
              ? `${convertMoneyToString(income)} / year`
              : `${convertMoneyToString(income)} / month`}
          </p>
        </div>
      </div>
    </div>
  );
}
