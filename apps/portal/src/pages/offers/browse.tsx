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
      <Banner>
        ⭐ Check if your offer is competitive by submitting it{' '}
        <Link className="underline" href="/offers/submit">
          here
        </Link>
        . ⭐
      </Banner>
      <div className="space-y-6 bg-stone-100 py-16">
        <div>
          <div>
            <h1 className="text-primary-600 text-center text-6xl font-bold">
              Tech Offers Repo
            </h1>
          </div>
          <div className="mt-4 text-center text-3xl text-slate-600">
            Find out how good your offer is. Discover how others got their
            offers.
          </div>
        </div>
        <div className="flex items-start justify-center">
          <div className="mt-4 flex items-center space-x-4 text-lg text-slate-500">
            <span>Viewing offers for</span>
            <JobTitlesTypeahead
              isLabelHidden={true}
              placeHolder="Software Engineer"
              onSelect={({ value }) => setjobTitleFilter(value)}
            />
            <span>in</span>
            <CompaniesTypeahead
              isLabelHidden={true}
              placeHolder="All Companies"
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
