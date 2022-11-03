import { useEffect, useState } from 'react';
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
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);
  return (
    <nav aria-label="Table navigation" className="p-4">
      <div className="flex grid grid-cols-1 items-center md:grid-cols-2">
        <div className="mb-2 text-sm font-normal text-slate-500 md:mb-0">
          Showing
          <span className="font-semibold text-slate-900">
            {` ${startNumber} - ${endNumber} `}
          </span>
          {`of `}
          <span className="font-semibold text-slate-900">
            {pagination.totalItems}
          </span>
        </div>
        <div className="flex md:justify-end">
          <Pagination
            current={pagination.currentPage + 1}
            end={pagination.numOfPages}
            label="Pagination"
            pagePadding={screenWidth > 500 ? 2 : 0}
            start={1}
            onSelect={(currPage) => {
              handlePageChange(currPage - 1);
            }}
          />
        </div>
      </div>
    </nav>
  );
}
