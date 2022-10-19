import { UserCircleIcon } from '@heroicons/react/24/outline';

import { HorizontalDivider } from '~/../../../packages/ui/dist';
import { formatDate } from '~/utils/offers/time';

import { JobType } from '../types';

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
    <div className="my-5 block rounded-lg border p-4">
      <div className="grid grid-flow-col grid-cols-12 gap-x-10">
        <div className="col-span-1">
          <UserCircleIcon width={50} />
        </div>
        <div className="col-span-10">
          <p className="text-sm	font-semibold">{profileName}</p>
          <p className="text-xs	">Previous company: {previousCompanies[0]}</p>
          <p className="text-xs	">YOE: {totalYoe} year(s)</p>
        </div>
      </div>

      <HorizontalDivider />
      <div className="grid grid-flow-col grid-cols-2 gap-x-10">
        <div className="col-span-1 row-span-3">
          <p className="text-sm	font-semibold">{title}</p>
          <p className="text-xs	">
            Company: {company.name}, {location}
          </p>
          <p className="text-xs	">Level: {level}</p>
        </div>
        <div className="col-span-1 row-span-3">
          <p className="text-end text-sm">{formatDate(monthYearReceived)}</p>
          <p className="text-end text-xl">
            {jobType === JobType.FullTime
              ? `$${income} / year`
              : `$${income} / month`}
          </p>
        </div>
      </div>
    </div>
  );
}
