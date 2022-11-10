import clsx from 'clsx';
import Link from 'next/link';
import { JobType } from '@prisma/client';

import CompanyProfileImage from '~/components/shared/CompanyProfileImage';
import type { JobTitleType } from '~/components/shared/JobTitles';
import { getLabelForJobTitleType } from '~/components/shared/JobTitles';

import { convertMoneyToString } from '~/utils/offers/currency';
import { formatDate } from '~/utils/offers/time';

import type { DashboardOffer } from '~/types/offers';

export type OfferTableRowProps = Readonly<{
  jobType: JobType;
  row: DashboardOffer;
}>;

export default function OfferTableRow({
  jobType,
  row: {
    baseSalary,
    bonus,
    company,
    id,
    income,
    location,
    monthYearReceived,
    numberOfOtherOffers,
    profileId,
    stocks,
    title,
    totalYoe,
  },
}: OfferTableRowProps) {
  return (
    <tr key={id} className="divide-x divide-slate-200 border-b bg-white">
      <td className="flex items-center gap-3 space-y-0.5 py-2 px-4" scope="row">
        <CompanyProfileImage
          alt={company.name}
          className="hidden h-6 w-6 object-contain sm:block"
          src={company.logoUrl}
        />
        <div>
          <div className="line-clamp-2 sm:line-clamp-1 font-medium">
            {company.name}
          </div>
          <div className="text-xs text-slate-500">
            {location.cityName} ({location.countryCode})
          </div>
        </div>
      </td>
      <td className="py-2 px-4">
        {getLabelForJobTitleType(title as JobTitleType)}
      </td>
      <td className="py-2 px-4">{totalYoe}</td>
      <td className="py-2 px-4">{convertMoneyToString(income)}</td>
      {jobType === JobType.FULLTIME && (
        <td className="py-2 px-4">
          {`${convertMoneyToString(baseSalary)} / ${convertMoneyToString(
            bonus,
          )} / ${convertMoneyToString(stocks)}`}
        </td>
      )}
      <td className="py-2 px-4">{formatDate(monthYearReceived)}</td>
      <td
        className={clsx(
          'sticky right-0 bg-white px-4 py-2 drop-shadow lg:drop-shadow-none',
        )}>
        <Link
          className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
          href={`/offers/profile/${profileId}`}>
          View Profile
        </Link>
        {numberOfOtherOffers > 0 && (
          <div className="text-xs text-slate-500">
            This person also received {numberOfOtherOffers} other offer(s).
          </div>
        )}
      </td>
    </tr>
  );
}
