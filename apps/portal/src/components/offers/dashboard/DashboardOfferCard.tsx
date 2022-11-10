import {
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid';
import { JobType } from '@prisma/client';

import { JobTypeLabel } from '~/components/offers/constants';
import CompanyProfileImage from '~/components/shared/CompanyProfileImage';
import type { JobTitleType } from '~/components/shared/JobTitles';
import { getLabelForJobTitleType } from '~/components/shared/JobTitles';

import { convertMoneyToString } from '~/utils/offers/currency';
import { formatDate } from '~/utils/offers/time';

import type { UserProfileOffer } from '~/types/offers';

type Props = Readonly<{
  offer: UserProfileOffer;
}>;

export default function DashboardProfileCard({
  offer: {
    company,
    income,
    jobType,
    level,
    location,
    monthYearReceived,
    title,
  },
}: Props) {
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
        <div className="col-span-1 row-span-3">
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
