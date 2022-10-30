import Link from 'next/link';
import { useState } from 'react';
import { Banner } from '@tih/ui';

import OffersTable from '~/components/offers/table/OffersTable';
import CompaniesTypeahead from '~/components/shared/CompaniesTypeahead';
import JobTitlesTypeahead from '~/components/shared/JobTitlesTypahead';

export default function OffersHomePage() {
  const [jobTitleFilter, setjobTitleFilter] = useState('software-engineer');
  const [companyFilter, setCompanyFilter] = useState('');

  return (
    <main className="flex-1 overflow-y-auto">
      <Banner size="sm">
        ⭐ Check if your offer is competitive by submitting it{' '}
        <Link className="underline" href="/offers/submit">
          here
        </Link>
        . ⭐
      </Banner>
      <div className="bg-slate-100 py-16 px-4">
        <div>
          <div>
            <h1 className="text-primary-600 text-center text-4xl font-bold sm:text-5xl">
              Tech Offers Repo
            </h1>
          </div>
          <div className="mt-4 text-center text-lg text-slate-600 sm:text-2xl">
            Find out how good your offer is. Discover how others got their
            offers.
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center justify-center space-y-2 text-base text-slate-700 sm:mt-10 sm:flex-row sm:space-y-0 sm:space-x-4 sm:text-lg">
          <span>Viewing offers for</span>
          <div className="flex items-center space-x-4">
            <JobTitlesTypeahead
              isLabelHidden={true}
              placeHolder="Software Engineer"
              // @ts-ignore TODO(offers): handle potentially null value.
              onSelect={({ value }) => setjobTitleFilter(value)}
            />
            <span>in</span>
            <CompaniesTypeahead
              isLabelHidden={true}
              placeHolder="All Companies"
              // @ts-ignore TODO(offers): handle potentially null value.
              onSelect={({ value }) => setCompanyFilter(value)}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-white pb-20 pt-10">
        <OffersTable
          companyFilter={companyFilter}
          jobTitleFilter={jobTitleFilter}
        />
      </div>
    </main>
  );
}
