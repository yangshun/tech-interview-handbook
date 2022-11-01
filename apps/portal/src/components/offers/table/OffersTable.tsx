import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { DropdownMenu, Spinner } from '@tih/ui';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';
import OffersTablePagination from '~/components/offers/table/OffersTablePagination';
import {
  OfferTableFilterOptions,
  OfferTableSortBy,
  OfferTableTabOptions,
  YOE_CATEGORY,
} from '~/components/offers/table/types';

import { Currency } from '~/utils/offers/currency/CurrencyEnum';
import CurrencySelector from '~/utils/offers/currency/CurrencySelector';
import { trpc } from '~/utils/trpc';

import OffersRow from './OffersRow';

import type { DashboardOffer, GetOffersResponse, Paging } from '~/types/offers';

const NUMBER_OF_OFFERS_IN_PAGE = 10;
export type OffersTableProps = Readonly<{
  companyFilter: string;
  jobTitleFilter: string;
}>;
export default function OffersTable({
  companyFilter,
  jobTitleFilter,
}: OffersTableProps) {
  const [currency, setCurrency] = useState(Currency.SGD.toString()); // TODO: Detect location
  const [selectedTab, setSelectedTab] = useState(YOE_CATEGORY.ENTRY);
  const [pagination, setPagination] = useState<Paging>({
    currentPage: 0,
    numOfItems: 0,
    numOfPages: 0,
    totalItems: 0,
  });
  const [offers, setOffers] = useState<Array<DashboardOffer>>([]);
  const [selectedFilter, setSelectedFilter] = useState(
    OfferTableFilterOptions[0].value,
  );
  const { event: gaEvent } = useGoogleAnalytics();
  useEffect(() => {
    setPagination({
      currentPage: 0,
      numOfItems: 0,
      numOfPages: 0,
      totalItems: 0,
    });
  }, [selectedTab, currency]);
  const offersQuery = trpc.useQuery(
    [
      'offers.list',
      {
        companyId: companyFilter,
        currency,
        limit: NUMBER_OF_OFFERS_IN_PAGE,
        location: 'Singapore, Singapore', // TODO: Geolocation
        offset: pagination.currentPage,
        sortBy: OfferTableSortBy[selectedFilter] ?? '-monthYearReceived',
        title: jobTitleFilter,
        yoeCategory: selectedTab,
      },
    ],
    {
      onError: (err) => {
        alert(err);
      },
      onSuccess: (response: GetOffersResponse) => {
        setOffers(response.data);
        setPagination(response.paging);
      },
    },
  );

  function renderFilters() {
    return (
      <div className="m-4 flex grid grid-cols-1 items-center justify-between gap-6 sm:grid-cols-4">
        <DropdownMenu
          align="start"
          label={
            OfferTableTabOptions.filter(
              ({ value: itemValue }) => itemValue === selectedTab,
            )[0].label
          }
          size="inherit">
          {OfferTableTabOptions.map(({ label: itemLabel, value }) => (
            <DropdownMenu.Item
              key={value}
              isSelected={value === selectedTab}
              label={itemLabel}
              onClick={() => {
                setSelectedTab(value);
                gaEvent({
                  action: `offers.table_filter_yoe_category_${value}`,
                  category: 'engagement',
                  label: 'Filter by YOE category',
                });
              }}
            />
          ))}
        </DropdownMenu>
        <div className="divide-x-slate-200 col-span-3 flex items-center justify-end space-x-4 divide-x">
          <div className="justify-left flex items-center space-x-2">
            <span>View all offers in</span>
            <CurrencySelector
              handleCurrencyChange={(value: string) => setCurrency(value)}
              selectedCurrency={currency}
            />
          </div>
          <div className="pl-4">
            <DropdownMenu
              align="end"
              label={
                OfferTableFilterOptions.filter(
                  ({ value: itemValue }) => itemValue === selectedFilter,
                )[0].label
              }
              size="inherit">
              {OfferTableFilterOptions.map(({ label: itemLabel, value }) => (
                <DropdownMenu.Item
                  key={value}
                  isSelected={value === selectedFilter}
                  label={itemLabel}
                  onClick={() => {
                    setSelectedFilter(value);
                  }}
                />
              ))}
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  }

  function renderHeader() {
    const columns = [
      'Company',
      'Title',
      'YOE',
      selectedTab === YOE_CATEGORY.INTERN ? 'Monthly Salary' : 'Annual TC',
      'Date Offered',
      'Actions',
    ];
    return (
      <thead className="text-slate-700">
        <tr className="divide-x divide-slate-200">
          {columns.map((header, index) => (
            <th
              key={header}
              className={clsx(
                'bg-slate-100 py-3 px-6',
                // Make last column sticky.
                index === columns.length - 1 &&
                  'sticky right-0 drop-shadow md:drop-shadow-none',
              )}
              scope="col">
              {header}
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  const handlePageChange = (currPage: number) => {
    if (0 <= currPage && currPage < pagination.numOfPages) {
      setPagination({ ...pagination, currentPage: currPage });
    }
  };

  return (
    <div className="w-5/6">
      <div className="relative w-full border border-slate-200">
        {renderFilters()}
        {offersQuery.isLoading ? (
          <div className="col-span-10 pt-4">
            <Spinner display="block" size="lg" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-slate-200 border-y border-slate-200 text-left text-slate-600">
              {renderHeader()}
              <tbody>
                {offers.map((offer) => (
                  <OffersRow key={offer.id} row={offer} />
                ))}
              </tbody>
            </table>
          </div>
        )}
        <OffersTablePagination
          endNumber={
            pagination.currentPage * NUMBER_OF_OFFERS_IN_PAGE + offers.length
          }
          handlePageChange={handlePageChange}
          pagination={pagination}
          startNumber={pagination.currentPage * NUMBER_OF_OFFERS_IN_PAGE + 1}
        />
      </div>
    </div>
  );
}
