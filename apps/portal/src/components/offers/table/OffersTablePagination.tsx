import { Pagination } from '@tih/ui';

import type { PaginationType } from '~/components/offers/table/types';

type OffersTablePaginationProps = Readonly<{
  endNumber: number;
  handlePageChange: (page: number) => void;
  pagination: PaginationType;
  startNumber: number;
}>;

export default function OffersTablePagination({
  endNumber,
  pagination,
  startNumber,
  handlePageChange,
}: OffersTablePaginationProps) {
  return (
    <nav
      aria-label="Table navigation"
      className="flex items-center justify-between p-4">
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing
        <span className="font-semibold text-gray-900 dark:text-white">
          {` ${startNumber} - ${endNumber} `}
        </span>
        {`of `}
        <span className="font-semibold text-gray-900 dark:text-white">
          {pagination.totalItems}
        </span>
      </span>
      <Pagination
        current={pagination.currentPage}
        end={pagination.numOfPages}
        label="Pagination"
        pagePadding={1}
        start={1}
        onSelect={(currPage) => {
          handlePageChange(currPage);
        }}
      />
    </nav>
  );
}
