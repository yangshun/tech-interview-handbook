import { useEffect, useState } from 'react';
import { HorizontalDivider, Select, Spinner, Tabs } from '@tih/ui';

import OffersTablePagination from '~/components/offers/table/OffersTablePagination';
import { YOE_CATEGORY } from '~/components/offers/table/types';

import CurrencySelector from '~/utils/offers/currency/CurrencySelector';
import { trpc } from '~/utils/trpc';

import OffersRow from './OffersRow';

import type { DashboardOffer, Paging } from '~/types/offers';

const NUMBER_OF_OFFERS_IN_PAGE = 10;
export type OffersTableProps = Readonly<{
  companyFilter: string;
  jobTitleFilter: string;
}>;
export default function OffersTable({
  companyFilter,
  jobTitleFilter,
}: OffersTableProps) {
  const [currency, setCurrency] = useState('SGD'); // TODO: Detect location
  const [selectedTab, setSelectedTab] = useState(YOE_CATEGORY.ENTRY);
  const [pagination, setPagination] = useState<Paging>({
    currentPage: 0,
    numOfItems: 0,
    numOfPages: 0,
    totalItems: 0,
  });
  const [offers, setOffers] = useState<Array<DashboardOffer>>([]);

  useEffect(() => {
    setPagination({
      currentPage: 0,
      numOfItems: 0,
      numOfPages: 0,
      totalItems: 0,
    });
  }, [selectedTab]);
  const offersQuery = trpc.useQuery(
    [
      'offers.list',
      {
        companyId: companyFilter,
        limit: NUMBER_OF_OFFERS_IN_PAGE,
        location: 'Singapore, Singapore', // TODO: Geolocation
        offset: 0,
        sortBy: '-monthYearReceived',
        title: jobTitleFilter,
        yoeCategory: selectedTab,
      },
    ],
    {
      onSuccess: (response) => {
        // Const filteredData = response.data.map((res) => {
        //   return {
        //     company: res.company.name,
        //     date: res.monthYearReceived,
        //     id: res.id,
        //     profileId: res.profileId,
        //     income: res.income,
        //     title: res.title,
        //     yoe: res.totalYoe,
        //   };
        // });
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
            tabs={[
              {
                label: 'Fresh Grad (0-2 YOE)',
                value: YOE_CATEGORY.ENTRY,
              },
              {
                label: 'Mid (3-5 YOE)',
                value: YOE_CATEGORY.MID,
              },
              {
                label: 'Senior (6+ YOE)',
                value: YOE_CATEGORY.SENIOR,
              },
              {
                label: 'Internship',
                value: YOE_CATEGORY.INTERN,
              },
            ]}
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
          disabled={true}
          isLabelHidden={true}
          label=""
          options={[
            {
              label: 'Latest Submitted',
              value: 'latest-submitted',
            },
          ]}
          value="latest-submitted"
        />
      </div>
    );
  }

  function renderHeader() {
    return (
      <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
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
    setPagination({ ...pagination, currentPage: currPage });
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
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
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
