import Link from 'next/link';

import { convertCurrencyToString } from '~/utils/offers/currency';
import { formatDate } from '~/utils/offers/time';

import type { DashboardOffer } from '~/types/offers';

export type OfferTableRowProps = Readonly<{ row: DashboardOffer }>;

export default function OfferTableRow({
  row: { company, id, income, monthYearReceived, profileId, title, totalYoe },
}: OfferTableRowProps) {
  return (
    <tr
      key={id}
      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
      <th
        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
        scope="row">
        {company.name}
      </th>
      <td className="py-4 px-6">{title}</td>
      <td className="py-4 px-6">{totalYoe}</td>
      <td className="py-4 px-6">{convertCurrencyToString(income)}</td>
      <td className="py-4 px-6">{formatDate(monthYearReceived)}</td>
      <td className="space-x-4 py-4 px-6">
        <Link
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
          href={`/offers/profile/${profileId}`}>
          View Profile
        </Link>
      </td>
    </tr>
  );
}
