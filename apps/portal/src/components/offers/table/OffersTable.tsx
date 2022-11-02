import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { DropdownMenu, Spinner } from '@tih/ui';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';
import OffersTablePagination from '~/components/offers/table/OffersTablePagination';
import {
  OfferTableFilterOptions,
  OfferTableSortBy,
  OfferTableYoeOptions,
  YOE_CATEGORY,
  YOE_CATEGORY_PARAM,
} from '~/components/offers/table/types';

import { Currency } from '~/utils/offers/currency/CurrencyEnum';
import CurrencySelector from '~/utils/offers/currency/CurrencySelector';
import { trpc } from '~/utils/trpc';

import OffersRow from './OffersRow';

import type { DashboardOffer, GetOffersResponse, Paging } from '~/types/offers';

const NUMBER_OF_OFFERS_IN_PAGE = 10;
export type OffersTableProps = Readonly<{
  cityFilter: string;
  companyFilter: string;
  jobTitleFilter: string;
}>;
export default function OffersTable({
  cityFilter,
  companyFilter,
  jobTitleFilter,
}: OffersTableProps) {
  const [currency, setCurrency] = useState(Currency.SGD.toString()); // TODO: Detect location
  const [selectedYoe, setSelectedYoe] = useState('');
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
  const router = useRouter();
  const { yoeCategory = '' } = router.query;

  useEffect(() => {
    setPagination({
      currentPage: 0,
      numOfItems: 0,
      numOfPages: 0,
      totalItems: 0,
    });
  }, [selectedYoe, currency]);

  useEffect(() => {
    setSelectedYoe(yoeCategory as YOE_CATEGORY);
  }, [yoeCategory]);

  const offersQuery = trpc.useQuery(
    [
      'offers.list',
      {
        companyId: companyFilter,
        // Location: 'Singapore, Singapore', // TODO: Geolocation
        countryId: cityFilter,
        currency,
        limit: NUMBER_OF_OFFERS_IN_PAGE,
        offset: pagination.currentPage,
        sortBy: OfferTableSortBy[selectedFilter] ?? '-monthYearReceived',
        title: jobTitleFilter,
        yoeCategory: YOE_CATEGORY_PARAM[yoeCategory as string] ?? undefined,
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
      <div className="flex items-center justify-between p-4 text-sm sm:grid-cols-4 md:text-base">
        <DropdownMenu
          align="start"
          label={
            OfferTableYoeOptions.filter(
              ({ value: itemValue }) => itemValue === selectedYoe,
            )[0].label
          }
          size="inherit">
          {OfferTableYoeOptions.map(({ label: itemLabel, value }) => (
            <DropdownMenu.Item
              key={value}
              isSelected={value === selectedYoe}
              label={itemLabel}
              onClick={() => {
                if (value === '') {
                  router.replace(
                    {
                      pathname: router.pathname,
                      query: undefined,
                    },
                    undefined,
                    // Do not refresh the page
                    { shallow: true },
                  );
                } else {
                  const params = new URLSearchParams({
                    ['yoeCategory']: value,
                  });
                  router.replace({
                    pathname: location.pathname,
                    search: params.toString(),
                  });
                }
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
            <span className="sr-only sm:not-sr-only sm:inline">
              Display offers in
            </span>
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
      selectedYoe === YOE_CATEGORY.INTERN ? 'Monthly Salary' : 'Annual TC',
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
  );
}
