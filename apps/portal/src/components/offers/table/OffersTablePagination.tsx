import { Pagination } from '@tih/ui';

import type { Paging } from '~/types/offers';

type OffersTablePaginationProps = Readonly<{
  endNumber: number;
  handlePageChange: (page: number) => void;
  pagination: Paging;
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
        current={pagination.currentPage + 1}
        end={pagination.numOfPages}
        label="Pagination"
        pagePadding={2}
        start={1}
        onSelect={(currPage) => {
          handlePageChange(currPage - 1);
        }}
      />
    </nav>
  );
}
