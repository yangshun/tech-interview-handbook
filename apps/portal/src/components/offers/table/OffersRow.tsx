import clsx from 'clsx';
import Link from 'next/link';

import type { JobTitleType } from '~/components/shared/JobTitles';
import { getLabelForJobTitleType } from '~/components/shared/JobTitles';

import { convertMoneyToString } from '~/utils/offers/currency';
import { formatDate } from '~/utils/offers/time';

import type { DashboardOffer } from '~/types/offers';

export type OfferTableRowProps = Readonly<{ row: DashboardOffer }>;

export default function OfferTableRow({
  row: { company, id, income, monthYearReceived, profileId, title, totalYoe },
}: OfferTableRowProps) {
  return (
    <tr key={id} className="divide-x divide-slate-200 border-b bg-white">
      <th className="whitespace-nowrap py-4 px-6 font-medium" scope="row">
        {company.name}
      </th>
      <td className="py-4 px-6">
        {getLabelForJobTitleType(title as JobTitleType)}
      </td>
      <td className="py-4 px-6">{totalYoe}</td>
      <td className="py-4 px-6">{convertMoneyToString(income)}</td>
      <td className="py-4 px-6">{formatDate(monthYearReceived)}</td>
      <td
        className={clsx(
          'sticky right-0 bg-white px-6 py-4 drop-shadow lg:drop-shadow-none',
        )}>
        <Link
          className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
          href={`/offers/profile/${profileId}`}>
          View Profile
        </Link>
      </td>
    </tr>
  );
}
