import { useState } from 'react';
import { Select } from '@tih/ui';

import OffersTitle from '~/components/offers/OffersTitle';
import OffersTable from '~/components/offers/table/OffersTable';
import CompaniesTypeahead from '~/components/shared/CompaniesTypeahead';

export default function OffersHomePage() {
  const [jobTitleFilter, setjobTitleFilter] = useState('Software Engineer');
  const [companyFilter, setCompanyFilter] = useState('All companies');

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="grid-rows grid h-1/2 bg-gray-100">
        <OffersTitle />
        <div className="flex items-start justify-center">
          <div className="mt-4 flex items-center">
            Viewing offers for
            <div className="mx-4">
              <Select
                isLabelHidden={true}
                label="Select a job title"
                options={[
                  {
                    label: 'Software Engineer',
                    value: 'Software Engineer',
                  },
                  {
                    label: 'Frontend Engineer',
                    value: 'Frontend Engineer',
                  },
                  {
                    label: 'Backend Engineer',
                    value: 'Backend Engineer',
                  },
                  {
                    label: 'Full-stack Engineer',
                    value: 'Full-stack Engineer',
                  },
                ]}
                value={jobTitleFilter}
                onChange={setjobTitleFilter}
              />
            </div>
            in
            <div className="ml-4">
              <CompaniesTypeahead
                isLabelHidden={true}
                placeHolder="All companies"
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
