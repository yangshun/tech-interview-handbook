import { useEffect, useState } from 'react';
import { Pagination, Spinner } from '~/ui';

import type { Paging } from '~/types/offers';

type OffersTablePaginationProps = Readonly<{
  endNumber: number;
  handlePageChange: (page: number) => void;
  isInitialFetch?: boolean;
  isLoading?: boolean;
  pagination: Paging;
  startNumber: number;
}>;

export default function OffersTablePagination({
  isInitialFetch,
  isLoading,
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
    <nav aria-label="Offers Pagination" className="py-3 px-4">
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-2">
        <div>
          {!isInitialFetch && (
            <div className="flex items-center space-x-2">
              <div className="text-sm text-slate-500">
                Showing
                <span className="font-semibold text-slate-900">
                  {` ${endNumber > 0 ? startNumber : 0} - ${endNumber} `}
                </span>
                {`of `}
                <span className="font-semibold text-slate-900">
                  {pagination.totalItems}
                </span>{' '}
                results
              </div>
              {isLoading && <Spinner size="xs" />}
            </div>
          )}
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
