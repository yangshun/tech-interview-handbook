import { useEffect, useState } from 'react';
import { HorizontalDivider, Select, Spinner, Tabs } from '@tih/ui';

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

  function renderTabs() {
    return (
      <div className="flex justify-center">
        <div className="w-fit">
          <Tabs
            label="Table Navigation"
            tabs={OfferTableTabOptions}
            value={selectedTab}
            onChange={(value) => setSelectedTab(value)}
          />
        </div>
      </div>
    );
  }

  function renderFilters() {
    return (
      <div className="m-4 flex items-center justify-between">
        <div className="justify-left flex items-center space-x-2">
          <span>All offers in</span>
          <CurrencySelector
            handleCurrencyChange={(value: string) => setCurrency(value)}
            selectedCurrency={currency}
          />
        </div>
        <Select
          isLabelHidden={true}
          label=""
          options={OfferTableFilterOptions}
          value={selectedFilter}
          onChange={(value) => setSelectedFilter(value)}
        />
      </div>
    );
  }

  function renderHeader() {
    return (
      <thead className="bg-gray-50 text-xs uppercase text-gray-700">
        <tr>
          {[
            'Company',
            'Title',
            'YOE',
            selectedTab === YOE_CATEGORY.INTERN ? 'Monthly Salary' : 'TC/year',
            'Date offered',
            'Actions',
          ].map((header) => (
            <th key={header} className="py-3 px-6" scope="col">
              {header}
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  const handlePageChange = (currPage: number) => {
    if (0 < currPage && currPage < pagination.numOfPages) {
      setPagination({ ...pagination, currentPage: currPage });
    }
  };

  return (
    <div className="w-5/6">
      {renderTabs()}
      <HorizontalDivider />
      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        {renderFilters()}
        {offersQuery.isLoading ? (
          <div className="col-span-10 pt-4">
            <Spinner display="block" size="lg" />
          </div>
        ) : (
          <table className="w-full text-left text-sm text-gray-500">
            {renderHeader()}
            <tbody>
              {offers.map((offer) => (
                <OffersRow key={offer.id} row={offer} />
              ))}
            </tbody>
          </table>
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
