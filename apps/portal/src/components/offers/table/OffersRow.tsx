import Link from 'next/link';

import { convertMoneyToString } from '~/utils/offers/currency';
import { formatDate } from '~/utils/offers/time';

import type { DashboardOffer } from '~/types/offers';

export type OfferTableRowProps = Readonly<{ row: DashboardOffer }>;

export default function OfferTableRow({
  row: { company, id, income, monthYearReceived, profileId, title, totalYoe },
}: OfferTableRowProps) {
  return (
    <tr
      key={id}
      className="border-b bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-600">
      <th
        className="whitespace-nowrap py-4 px-6 font-medium text-slate-900 dark:text-white"
        scope="row">
        {company.name}
      </th>
      <td className="py-4 px-6">{title}</td>
      <td className="py-4 px-6">{totalYoe}</td>
      <td className="py-4 px-6">{convertMoneyToString(income)}</td>
      <td className="py-4 px-6">{formatDate(monthYearReceived)}</td>
      <td className="space-x-4 py-4 px-6">
        <Link
          className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
          href={`/offers/profile/${profileId}`}>
          View Profile
        </Link>
      </td>
    </tr>
  );
}
