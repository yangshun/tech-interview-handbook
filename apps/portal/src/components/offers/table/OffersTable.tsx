import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { JobType } from '@prisma/client';
import { DropdownMenu, Spinner, useToast } from '@tih/ui';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';
import OffersTablePagination from '~/components/offers/table/OffersTablePagination';
import type { OfferTableSortByType } from '~/components/offers/table/types';
import {
  OfferTableFilterOptions,
  OfferTableYoeOptions,
  YOE_CATEGORY,
  YOE_CATEGORY_PARAM,
} from '~/components/offers/table/types';

import { Currency } from '~/utils/offers/currency/CurrencyEnum';
import CurrencySelector from '~/utils/offers/currency/CurrencySelector';
import { useSearchParamSingle } from '~/utils/offers/useSearchParam';
import { trpc } from '~/utils/trpc';

import OffersRow from './OffersRow';

import type { DashboardOffer, GetOffersResponse, Paging } from '~/types/offers';

const NUMBER_OF_OFFERS_IN_PAGE = 10;
export type OffersTableProps = Readonly<{
  companyFilter: string;
  companyName?: string;
  countryFilter: string;
  jobTitleFilter: string;
}>;
export default function OffersTable({
  countryFilter,
  companyName,
  companyFilter,
  jobTitleFilter,
}: OffersTableProps) {
  const [currency, setCurrency] = useState(Currency.SGD.toString()); // TODO: Detect location
  const [jobType, setJobType] = useState<JobType>(JobType.FULLTIME);
  const [pagination, setPagination] = useState<Paging>({
    currentPage: 0,
    numOfItems: 0,
    numOfPages: 0,
    totalItems: 0,
  });

  const [offers, setOffers] = useState<Array<DashboardOffer>>([]);

  const { event: gaEvent } = useGoogleAnalytics();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const [
    selectedYoeCategory,
    setSelectedYoeCategory,
    isYoeCategoryInitialized,
  ] = useSearchParamSingle<keyof typeof YOE_CATEGORY_PARAM>('yoeCategory');

  const [selectedSortBy, setSelectedSortBy, isSortByInitialized] =
    useSearchParamSingle<OfferTableSortByType>('sortBy');

  const areFilterParamsInitialized = useMemo(() => {
    return isYoeCategoryInitialized && isSortByInitialized;
  }, [isYoeCategoryInitialized, isSortByInitialized]);
  const { pathname } = router;

  useEffect(() => {
    if (areFilterParamsInitialized) {
      router.replace(
        {
          pathname,
          query: {
            companyId: companyFilter,
            companyName,
            jobTitleId: jobTitleFilter,
            sortBy: selectedSortBy,
            yoeCategory: selectedYoeCategory,
          },
        },
        undefined,
        { shallow: true },
      );
      setPagination({
        currentPage: 0,
        numOfItems: 0,
        numOfPages: 0,
        totalItems: 0,
      });
      setIsLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    areFilterParamsInitialized,
    currency,
    countryFilter,
    companyFilter,
    jobTitleFilter,
    selectedSortBy,
    selectedYoeCategory,
    pathname,
  ]);

  const { showToast } = useToast();
  trpc.useQuery(
    [
      'offers.list',
      {
        companyId: companyFilter,
        countryId: countryFilter,
        currency,
        limit: NUMBER_OF_OFFERS_IN_PAGE,
        offset: pagination.currentPage,
        sortBy: selectedSortBy ?? '-monthYearReceived',
        title: jobTitleFilter,
        yoeCategory: selectedYoeCategory
          ? YOE_CATEGORY_PARAM[selectedYoeCategory as string]
          : undefined,
      },
    ],
    {
      onError: () => {
        showToast({
          title: 'Error loading the page.',
          variant: 'failure',
        });
      },
      onSuccess: (response: GetOffersResponse) => {
        setOffers(response.data);
        setPagination(response.paging);
        setJobType(response.jobType);
        setIsLoading(false);
      },
    },
  );

  function renderFilters() {
    return (
      <div className="flex items-center justify-between p-4 text-xs text-slate-700 sm:grid-cols-4 sm:text-sm md:text-base">
        <DropdownMenu
          align="start"
          label={
            OfferTableYoeOptions.filter(
              ({ value: itemValue }) => itemValue === selectedYoeCategory,
            ).length > 0
              ? OfferTableYoeOptions.filter(
                  ({ value: itemValue }) => itemValue === selectedYoeCategory,
                )[0].label
              : OfferTableYoeOptions[0].label
          }
          size="inherit">
          {OfferTableYoeOptions.map(({ label: itemLabel, value }) => (
            <DropdownMenu.Item
              key={value}
              isSelected={value === selectedYoeCategory}
              label={itemLabel}
              onClick={() => {
                setSelectedYoeCategory(value);
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
          <div className="justify-left flex items-center space-x-2 font-medium text-slate-700">
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
                  ({ value: itemValue }) => itemValue === selectedSortBy,
                ).length > 0
                  ? OfferTableFilterOptions.filter(
                      ({ value: itemValue }) => itemValue === selectedSortBy,
                    )[0].label
                  : OfferTableFilterOptions[0].label
              }
              size="inherit">
              {OfferTableFilterOptions.map(({ label: itemLabel, value }) => (
                <DropdownMenu.Item
                  key={value}
                  isSelected={value === selectedSortBy}
                  label={itemLabel}
                  onClick={() => {
                    setSelectedSortBy(value as OfferTableSortByType);
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
    let columns = [
      'Company',
      'Title',
      'YOE',
      selectedYoeCategory === YOE_CATEGORY.INTERN
        ? 'Monthly Salary'
        : 'Annual TC',
      'Date Offered',
      'Actions',
    ];
    if (jobType === JobType.FULLTIME) {
      columns = [
        'Company',
        'Title',
        'YOE',
        'Annual TC',
        'Annual Base / Bonus / Stocks',
        'Date Offered',
        'Actions',
      ];
    }

    return (
      <thead className="font-semibold">
        <tr className="divide-x divide-slate-200">
          {columns.map((header, index) => (
            <th
              key={header}
              className={clsx(
                'whitespace-nowrap bg-slate-100 py-3 px-4',
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
      {isLoading ? (
        <div className="col-span-10 py-32">
          <Spinner display="block" size="lg" />
        </div>
      ) : (
        <div className="overflow-x-auto text-slate-600">
          <table className="w-full divide-y divide-slate-200 border-y border-slate-200 text-left text-xs text-slate-700 sm:text-sm md:text-base">
            {renderHeader()}
            <tbody>
              {offers.map((offer) => (
                <OffersRow key={offer.id} jobType={jobType} row={offer} />
              ))}
            </tbody>
          </table>
          {!offers ||
            (offers.length === 0 && (
              <div className="py-16 text-lg">
                <div className="flex justify-center">No data yet🥺</div>
              </div>
            ))}
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