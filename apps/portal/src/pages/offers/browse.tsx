import { useState } from 'react';

import OffersTitle from '~/components/offers/OffersTitle';
import OffersTable from '~/components/offers/table/OffersTable';
import CompaniesTypeahead from '~/components/shared/CompaniesTypeahead';
import JobTitlesTypeahead from '~/components/shared/JobTitlesTypahead';

export default function OffersHomePage() {
  const [jobTitleFilter, setjobTitleFilter] = useState('software-engineer');
  const [companyFilter, setCompanyFilter] = useState('');

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="grid-rows grid h-1/2 bg-slate-100">
        <OffersTitle />
        <div className="flex items-start justify-center">
          <div className="mt-4 flex items-center">
            Viewing offers for
            <div className="mx-4">
              <JobTitlesTypeahead
                isLabelHidden={true}
                placeHolder="Software Engineer"
                onSelect={({ value }) => setjobTitleFilter(value)}
              />
            </div>
            in
            <div className="ml-4">
              <CompaniesTypeahead
                isLabelHidden={true}
                placeHolder="All Companies"
                onSelect={({ value }) => setCompanyFilter(value)}
              />
            </div>
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
