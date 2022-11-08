import clsx from 'clsx';

import type { OfferTableSortType } from '~/components/offers/table/types';
import {
  getOppositeSortOrder,
  OFFER_TABLE_SORT_ORDER,
} from '~/components/offers/table/types';

export type OffersTableHeaderProps = Readonly<{
  header: string;
  isLastColumn: boolean;
  onSort?: (
    sortDirection: OFFER_TABLE_SORT_ORDER,
    sortType: OfferTableSortType,
  ) => void;
  sortDirection?: OFFER_TABLE_SORT_ORDER;
  sortType?: OfferTableSortType;
}>;

export default function OffersHeader({
  header,
  isLastColumn,
  onSort,
  sortDirection,
  sortType,
}: OffersTableHeaderProps) {
  return (
    <th
      key={header}
      className={clsx(
        'bg-slate-100 py-3 px-4',
        sortType &&
          'hover:cursor-pointer hover:bg-slate-200 active:bg-slate-300',
        header !== 'Company' && 'whitespace-nowrap',
        (sortDirection === OFFER_TABLE_SORT_ORDER.ASC ||
          sortDirection === OFFER_TABLE_SORT_ORDER.DESC) &&
          'text-primary-600',
        // Make last column sticky.
        isLastColumn && 'sticky right-0 drop-shadow md:drop-shadow-none',
      )}
      scope="col"
      onClick={
        onSort &&
        sortType &&
        (() => {
          onSort(
            sortDirection
              ? getOppositeSortOrder(sortDirection)
              : OFFER_TABLE_SORT_ORDER.ASC,
            sortType,
          );
        })
      }>
      <div className="my-auto flex items-center justify-start">
        {header}
        {onSort && sortType && (
          <span className="ml-2 grid grid-cols-1 space-y-0 text-[9px] text-gray-300">
            <div
              className={clsx(
                '-mb-2 flex items-end sm:-mb-3',
                sortDirection === OFFER_TABLE_SORT_ORDER.ASC &&
                  'text-primary-500',
                sortDirection === OFFER_TABLE_SORT_ORDER.DESC &&
                  'text-slate-200',
              )}>
              ▲
            </div>
            <div
              className={clsx(
                '-mb-3 flex items-end',
                sortDirection === OFFER_TABLE_SORT_ORDER.DESC &&
                  'text-primary-500',
                sortDirection === OFFER_TABLE_SORT_ORDER.ASC &&
                  'text-slate-200',
              )}>
              ▼
            </div>
          </span>
        )}
      </div>
    </th>
  );
}
