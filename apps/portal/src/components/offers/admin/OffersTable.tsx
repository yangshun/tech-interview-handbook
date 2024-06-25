import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { JobType } from '@prisma/client';
import { DropdownMenu, Spinner, useToast } from '~/ui';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';
import OffersHeader from '~/components/offers/admin/OffersHeader';
import OffersRow from '~/components/offers/admin/OffersRow';
import OffersTablePagination from '~/components/offers/admin/OffersTablePagination';
import type {
  OfferTableColumn,
  OfferTableSortType,
} from '~/components/offers/admin/types';
import {
  FullTimeOfferTableColumns,
  InternOfferTableColumns,
  OFFER_TABLE_SORT_ORDER,
  OfferTableYoeOptions,
  YOE_CATEGORY_PARAM,
} from '~/components/offers/admin/types';

import { getCurrencyForCountry } from '~/utils/offers/currency/CurrencyEnum';
import CurrencySelector from '~/utils/offers/currency/CurrencySelector';
import { useSearchParamSingle } from '~/utils/offers/useSearchParam';
import { trpc } from '~/utils/trpc';

import type {
  AdminDashboardOffer,
  GetAdminOffersResponse,
  Paging,
} from '~/types/offers';

const NUMBER_OF_OFFERS_PER_PAGE = 20;

export type OffersTableProps = Readonly<{
  companyFilter: string;
  companyName?: string;
  country: string | null;
  countryFilter: string;
  jobTitleFilter: string;
}>;

export default function OffersTable({
  country,
  countryFilter,
  companyName,
  companyFilter,
  jobTitleFilter,
}: OffersTableProps) {
  const [currency, setCurrency] = useState(
    getCurrencyForCountry(country).toString(),
  );
  const [jobType, setJobType] = useState<JobType>(JobType.FULLTIME);
  const [pagination, setPagination] = useState<Paging>({
    currentPage: 0,
    numOfItems: 0,
    numOfPages: 0,
    totalItems: 0,
  });

  const [offers, setOffers] = useState<Array<AdminDashboardOffer>>([]);

  const { event: gaEvent } = useGoogleAnalytics();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const [
    selectedYoeCategory,
    setSelectedYoeCategory,
    isYoeCategoryInitialized,
  ] = useSearchParamSingle<keyof typeof YOE_CATEGORY_PARAM>('yoeCategory');

  const [
    selectedSortDirection,
    setSelectedSortDirection,
    isSortDirectionInitialized,
  ] = useSearchParamSingle<OFFER_TABLE_SORT_ORDER>('sortDirection');

  const [selectedSortType, setSelectedSortType, isSortTypeInitialized] =
    useSearchParamSingle<OfferTableSortType>('sortType');

  const areFilterParamsInitialized = useMemo(() => {
    return (
      isYoeCategoryInitialized &&
      isSortDirectionInitialized &&
      isSortTypeInitialized
    );
  }, [
    isYoeCategoryInitialized,
    isSortDirectionInitialized,
    isSortTypeInitialized,
  ]);
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
            sortDirection: selectedSortDirection,
            sortType: selectedSortType,
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
    selectedSortDirection,
    selectedSortType,
    selectedYoeCategory,
    pathname,
  ]);

  useEffect(() => {
    setSelectedSortDirection(OFFER_TABLE_SORT_ORDER.UNSORTED);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYoeCategory]);
  const topRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();
  const { isLoading: isResultsLoading } = trpc.useQuery(
    [
      'offers.admin.list',
      {
        companyId: companyFilter,
        countryId: countryFilter,
        currency,
        limit: NUMBER_OF_OFFERS_PER_PAGE,
        offset: pagination.currentPage,
        sortBy:
          selectedSortDirection && selectedSortType
            ? `${selectedSortDirection}${selectedSortType}`
            : '-monthYearReceived',
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
        setIsLoading(false);
      },
      onSuccess: (response: GetAdminOffersResponse) => {
        setOffers(response.data);
        setPagination(response.paging);
        setJobType(response.jobType);
        setIsLoading(false);
      },
    },
  );

  const onSort = (
    sortDirection: OFFER_TABLE_SORT_ORDER,
    sortType: OfferTableSortType,
  ) => {
    gaEvent({
      action: 'offers_table_sort',
      category: 'engagement',
      label: `${sortType} - ${sortDirection}`,
    });
    setSelectedSortType(sortType);
    setSelectedSortDirection(sortDirection);
  };

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
          size="md">
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
        </div>
      </div>
    );
  }

  function renderHeader() {
    const columns: Array<OfferTableColumn> =
      jobType === JobType.FULLTIME
        ? FullTimeOfferTableColumns
        : InternOfferTableColumns;

    return (
      <thead className="font-semibold">
        <tr className="divide-x divide-slate-200">
          {columns.map((header, index) => (
            <OffersHeader
              key={header.label}
              header={header.label}
              isLastColumn={index === columns.length - 1}
              sortDirection={
                header.sortType === selectedSortType
                  ? selectedSortDirection
                  : undefined
              }
              sortType={header.sortType}
              onSort={onSort}
            />
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
    <div className="relative w-full divide-y divide-slate-200 border border-slate-200 bg-white">
      <div ref={topRef}>{renderFilters()}</div>
      <OffersTablePagination
        endNumber={
          pagination.currentPage * NUMBER_OF_OFFERS_PER_PAGE + offers.length
        }
        handlePageChange={handlePageChange}
        isInitialFetch={isLoading}
        isLoading={isResultsLoading}
        pagination={pagination}
        startNumber={pagination.currentPage * NUMBER_OF_OFFERS_PER_PAGE + 1}
      />
      <div className="overflow-x-auto text-slate-600">
        <table className="w-full divide-y divide-slate-200 text-left text-xs text-slate-700 sm:text-sm">
          {renderHeader()}
          {!isLoading && (
            <tbody className="divide-y divide-slate-200">
              {offers.map((offer) => (
                <OffersRow key={offer.id} jobType={jobType} row={offer} />
              ))}
            </tbody>
          )}
        </table>
        {isLoading && (
          <div className="flex justify-center py-32">
            <Spinner display="block" size="lg" />
          </div>
        )}
        {!isLoading && (!offers || offers.length === 0) && (
          <div className="py-16 text-lg">
            <div className="flex justify-center">No data yet 🥺</div>
          </div>
        )}
      </div>
      <OffersTablePagination
        endNumber={
          pagination.currentPage * NUMBER_OF_OFFERS_PER_PAGE + offers.length
        }
        handlePageChange={(number) => {
          topRef?.current?.scrollIntoView({
            block: 'start',
          });
          handlePageChange(number);
        }}
        isInitialFetch={isLoading}
        isLoading={isResultsLoading}
        pagination={pagination}
        startNumber={pagination.currentPage * NUMBER_OF_OFFERS_PER_PAGE + 1}
      />
    </div>
  );
}
