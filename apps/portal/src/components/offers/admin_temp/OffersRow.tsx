import clsx from 'clsx';
import Link from 'next/link';
import { JobType } from '@prisma/client';

import type { JobTitleType } from '~/components/shared/JobTitles';
import { getLabelForJobTitleType } from '~/components/shared/JobTitles';

import { convertMoneyToString } from '~/utils/offers/currency';
import { formatDate } from '~/utils/offers/time';

import type { AdminDashboardOffer } from '~/types/offers';

export type OfferTableRowProps = Readonly<{
  jobType: JobType;
  row: AdminDashboardOffer;
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
    token,
  },
}: OfferTableRowProps) {
  return (
    <tr key={id} className="divide-x divide-slate-200 border-b bg-white">
      <td className="space-y-0.5 py-4 px-4" scope="row">
        <div className="font-medium">{company.name}</div>
        <div className="text-xs text-slate-500">
          {location.cityName} ({location.countryCode})
        </div>
      </td>
      <td className="py-4 px-4">
        {getLabelForJobTitleType(title as JobTitleType)}
      </td>
      <td className="py-4 px-4">{totalYoe}</td>
      <td className="py-4 px-4">{convertMoneyToString(income)}</td>
      {jobType === JobType.FULLTIME && (
        <td className="py-4 px-4">
          {`${convertMoneyToString(baseSalary)} / ${convertMoneyToString(
            bonus,
          )} / ${convertMoneyToString(stocks)}`}
        </td>
      )}
      <td className="py-4 px-4">{formatDate(monthYearReceived)}</td>
      <td
        className={clsx(
          'sticky right-0 bg-white px-4 py-4 drop-shadow lg:drop-shadow-none',
        )}>
        <Link
          className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
          href={`/offers/profile/${profileId}?token=${token}`}>
          View Editable Profile
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
