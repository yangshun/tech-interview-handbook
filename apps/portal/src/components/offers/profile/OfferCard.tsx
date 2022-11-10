import {
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid';
import { JobType } from '@prisma/client';

import { JobTypeLabel } from '~/components/offers/constants';
import { InternshipCycleValuesToLabels } from '~/components/offers/InternshipCycles';
import type { OfferDisplayData } from '~/components/offers/types';
import CompanyProfileImage from '~/components/shared/CompanyProfileImage';

import { getLocationDisplayText } from '~/utils/offers/string';
import { getDurationDisplayText } from '~/utils/offers/time';

type Props = Readonly<{
  offer: OfferDisplayData;
}>;

export default function OfferCard({
  offer: {
    base,
    bonus,
    company,
    duration,
    internshipCycle,
    jobTitle,
    jobLevel,
    jobType,
    location,
    receivedMonth,
    totalCompensation,
    startYear,
    stocks,
    monthlySalary,
    negotiationStrategy,
    otherComment,
  },
}: Props) {
  function UpperSection() {
    return (
      <div className="px-4 py-5 sm:px-6">
        <div className="flex justify-between gap-4">
          {company && (
            <CompanyProfileImage
              alt={company.name}
              className="h-10 w-10 object-contain"
              src={company.logoUrl}
            />
          )}
          <div className="grow">
            <h3 className="text-lg font-medium leading-6 text-slate-900">
              {jobTitle} {jobType && <>({JobTypeLabel[jobType]})</>}
            </h3>
            <div className="mt-1 flex flex-row flex-wrap sm:mt-0">
              {company?.name != null && (
                <div className="mr-4 mt-2 flex items-center text-sm text-slate-500">
                  <BuildingOfficeIcon
                    aria-hidden="true"
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
                  />
                  {company?.name}
                </div>
              )}
              {location && (
                <div className="mr-4 mt-2 flex items-center text-sm text-slate-500">
                  <MapPinIcon
                    aria-hidden="true"
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
                  />
                  {getLocationDisplayText(location)}
                </div>
              )}
              {(internshipCycle || startYear) && (
                <div className="mt-2 flex items-center text-sm text-slate-500">
                  <CalendarIcon
                    aria-hidden="true"
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
                  />
                  {internshipCycle && startYear
                    ? `${startYear} ${InternshipCycleValuesToLabels[internshipCycle]}`
                    : internshipCycle || startYear}
                </div>
              )}
              {jobLevel && (
                <div className="mt-2 flex items-center text-sm text-slate-500">
                  <ArrowTrendingUpIcon
                    aria-hidden="true"
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
                  />
                  {jobLevel}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            {!duration && receivedMonth && (
              <div className="text-sm text-slate-500">
                <p>{receivedMonth}</p>
              </div>
            )}
            {!!duration && (
              <div className="text-sm text-slate-500">
                <p>{getDurationDisplayText(duration)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  function BottomSection() {
    if (
      !totalCompensation &&
      !monthlySalary &&
      !negotiationStrategy &&
      !otherComment
    ) {
      return null;
    }

    return (
      <div className="border-t border-slate-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
          {jobType === JobType.FULLTIME
            ? totalCompensation && (
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-slate-500">
                    Total Compensation
                  </dt>
                  <dd className="mt-1 text-sm text-slate-900">
                    {totalCompensation}
                  </dd>
                </div>
              )
            : monthlySalary && (
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-slate-500">
                    Monthly Salary
                  </dt>
                  <dd className="mt-1 text-sm text-slate-900">
                    {monthlySalary}
                  </dd>
                </div>
              )}
          {base && (
            <div className="col-span-1">
              <dt className="text-sm font-medium text-slate-500">
                Base Salary
              </dt>
              <dd className="mt-1 text-sm text-slate-900">{base}</dd>
            </div>
          )}
          {stocks && (
            <div className="col-span-1">
              <dt className="text-sm font-medium text-slate-500">Stocks</dt>
              <dd className="mt-1 text-sm text-slate-900">{stocks}</dd>
            </div>
          )}
          {bonus && (
            <div className="col-span-1">
              <dt className="text-sm font-medium text-slate-500">Bonus</dt>
              <dd className="mt-1 text-sm text-slate-900">{bonus}</dd>
            </div>
          )}
          {negotiationStrategy && (
            <div className="col-span-2">
              <dt className="text-sm font-medium text-slate-500">
                Negotiation Strategy
              </dt>
              <dd className="mt-1 text-sm text-slate-900">
                {negotiationStrategy}
              </dd>
            </div>
          )}
          {otherComment && (
            <div className="col-span-2">
              <dt className="text-sm font-medium text-slate-500">Others</dt>
              <dd className="mt-1 text-sm text-slate-900">{otherComment}</dd>
            </div>
          )}
        </dl>
      </div>
    );
  }

  return (
    <div className="block rounded-lg border border-slate-200 bg-white">
      <UpperSection />
      <BottomSection />
    </div>
  );
}
