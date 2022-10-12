import Link from 'next/link';

import type { OfferTableRowData } from '~/components/offers/table/types';

export type OfferTableRowProps = Readonly<{ row: OfferTableRowData }>;

export default function OfferTableRow({
  row: { company, date, id, profileId, salary, title, yoe },
}: OfferTableRowProps) {
  return (
    <tr
      key={id}
      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
      <th
        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
        scope="row">
        {company}
      </th>
      <td className="py-4 px-6">{title}</td>
      <td className="py-4 px-6">{yoe}</td>
      <td className="py-4 px-6">{salary}</td>
      <td className="py-4 px-6">{date}</td>
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
