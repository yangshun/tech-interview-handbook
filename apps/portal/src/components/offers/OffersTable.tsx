import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HorizontalDivider, Pagination, Select, Tabs } from '@tih/ui';

import CurrencySelector from '~/utils/offers/currency/CurrencySelector';
import { formatDate } from '~/utils/offers/time';
import { trpc } from '~/utils/trpc';

type OfferTableRow = {
  company: string;
  date: string;
  id: string;
  profileId: string;
  salary: number | undefined;
  title: string;
  yoe: number;
};

// To be changed to backend enum
// eslint-disable-next-line no-shadow
enum YOE_CATEGORY {
  INTERN = 0,
  ENTRY = 1,
  MID = 2,
  SENIOR = 3,
}

type OffersTableProps = {
  companyFilter: string;
  jobTitleFilter: string;
};

type Pagination = {
  currentPage: number;
  numOfItems: number;
  numOfPages: number;
  totalItems: number;
};

const NUMBER_OF_OFFERS_IN_PAGE = 10;

export default function OffersTable({ jobTitleFilter }: OffersTableProps) {
  const [currency, setCurrency] = useState('SGD'); // TODO
  const [selectedTab, setSelectedTab] = useState(YOE_CATEGORY.ENTRY);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    numOfItems: 1,
    numOfPages: 0,
    totalItems: 0,
  });
  const [offers, setOffers] = useState<Array<OfferTableRow>>([]);

  useEffect(() => {
    setPagination({
      currentPage: 1,
      numOfItems: 1,
      numOfPages: 0,
      totalItems: 0,
    });
  }, [selectedTab]);
  trpc.useQuery(
    [
      'offers.list',
      {
        // Company: companyFilter, // TODO
        limit: NUMBER_OF_OFFERS_IN_PAGE,

        location: 'Singapore, Singapore',
        offset: pagination.currentPage - 1,
        sortBy: '-monthYearReceived',
        title: jobTitleFilter,
        yoeCategory: selectedTab,
      },
    ],
    {
      onSuccess: (response) => {
        const filteredData = response.data.map((res) => {
          return {
            company: res.company.name,
            date: formatDate(res.monthYearReceived),
            id: res.OffersFullTime
              ? res.OffersFullTime!.id
              : res.OffersIntern!.id,
            profileId: res.profileId,
            salary: res.OffersFullTime
              ? res.OffersFullTime?.totalCompensation.value
              : res.OffersIntern?.monthlySalary.value,
            title: res.OffersFullTime ? res.OffersFullTime?.level : '',
            yoe: 100,
          };
        });
        setOffers(filteredData);
        setPagination({
          currentPage: (response.paging.currPage as number) + 1,
          numOfItems: response.paging.numOfItemsInPage,
          numOfPages: response.paging.numOfPages,
          totalItems: response.paging.totalNumberOfOffers,
        });
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
                label: 'Fresh Grad (0-3 YOE)',
                value: YOE_CATEGORY.ENTRY,
              },
              {
                label: 'Mid (4-7 YOE)',
                value: YOE_CATEGORY.MID,
              },
              {
                label: 'Senior (8+ YOE)',
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
            'TC/year',
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

  function renderRow({
    company,
    title,
    yoe,
    salary,
    date,
    profileId,
    id,
  }: OfferTableRow) {
    return (
      <tr
        key={id}
        className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
        <th
          className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
          scope="row">
          {company}
        </th>
        <td className="py-4 px-6">{title}</td>
        <td className="py-4 px-6">{yoe}</td>
        <td className="py-4 px-6">{salary}</td>
        <td className="py-4 px-6">{date}</td>
        <td className="space-x-4 py-4 px-6">
          {/* <a
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
            onClick={() => handleClickViewProfile(profileId)}>
            View Profile
          </a> */}

          <Link
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
            href={`/offers/profile/${profileId}`}>
            View Profile
          </Link>
          {/* <a
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
            href="#">
            Comment
          </a> */}
        </td>
      </tr>
    );
  }

  function renderPagination() {
    return (
      <nav
        aria-label="Table navigation"
        className="flex items-center justify-between p-4">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing
          <span className="font-semibold text-gray-900 dark:text-white">
            {` ${
              (pagination.currentPage - 1) * NUMBER_OF_OFFERS_IN_PAGE + 1
            } - ${
              (pagination.currentPage - 1) * NUMBER_OF_OFFERS_IN_PAGE +
              offers.length
            } `}
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

  return (
    <div className="w-5/6">
      {renderTabs()}
      <HorizontalDivider />
      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        {renderFilters()}
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          {renderHeader()}
          <tbody>
            {offers.map((offer: OfferTableRow) => renderRow(offer))}
          </tbody>
        </table>
        {renderPagination()}
      </div>
    </div>
  );
}
