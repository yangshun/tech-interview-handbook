import { useState } from 'react';
import { HorizontalDivider, Pagination, Select, Tabs } from '@tih/ui';

import CurrencySelector from '~/components/offers/util/currency/CurrencySelector';

type TableRow = {
  company: string;
  date: string;
  salary: string;
  title: string;
  yoe: string;
};

// eslint-disable-next-line no-shadow
enum YOE_CATEGORY {
  INTERN = 0,
  ENTRY = 1,
  MID = 2,
  SENIOR = 3,
}

export default function OffersTable() {
  const [currency, setCurrency] = useState('SGD');
  const [selectedTab, setSelectedTab] = useState(YOE_CATEGORY.ENTRY);
  const [selectedPage, setSelectedPage] = useState(1);

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

  function renderRow({ company, title, yoe, salary, date }: TableRow) {
    return (
      <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
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
          <a
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
            href="#">
            View Profile
          </a>
          <a
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
            href="#">
            Comment
          </a>
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
          Showing{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            1-10
          </span>{' '}
          of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            1000
          </span>
        </span>
        <Pagination
          current={selectedPage}
          end={10}
          label="Pagination"
          pagePadding={1}
          start={1}
          onSelect={(page) => setSelectedPage(page)}
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
            {renderRow({
              company: 'Shopee',
              date: 'May 2022',
              salary: 'TC/yr',
              title: 'SWE',
              yoe: '5',
            })}
            {renderRow({
              company: 'Shopee',
              date: 'May 2022',
              salary: 'TC/yr',
              title: 'SWE',
              yoe: '5',
            })}
          </tbody>
        </table>
        {renderPagination()}
      </div>
    </div>
  );
}
