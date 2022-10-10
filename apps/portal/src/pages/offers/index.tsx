import { useState } from 'react';
import { Select } from '@tih/ui';

import OffersTable from '~/components/offers/OffersTable';
import OffersTitle from '~/components/offers/OffersTitle';
import CompaniesTypeahead from '~/components/shared/CompaniesTypeahead';

export default function OffersHomePage() {
  const [jobTitleFilter, setjobTitleFilter] = useState('Software engineers');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [companyFilter, setCompanyFilter] = useState('All companies');

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="grid-rows grid h-1/2 bg-gray-100">
        <OffersTitle />
        <div className="flex items-start justify-center">
          <div className="mt-4 flex items-end">
            Viewing offers for
            <div className="mx-4">
              <Select
                isLabelHidden={true}
                label="Select a job title"
                options={[
                  {
                    label: 'Software engineers',
                    value: 'Software engineers',
                  },
                  {
                    label: 'Frontend engineers',
                    value: 'Frontend engineers',
                  },
                  {
                    label: 'Backend engineers',
                    value: 'Backend engineers',
                  },
                  {
                    label: 'Full-stack engineers',
                    value: 'Full-stack engineers',
                  },
                ]}
                value={jobTitleFilter}
                onChange={setjobTitleFilter}
              />
            </div>
            in
            <div className="ml-4">
              <CompaniesTypeahead
                onSelect={({ value }) => setCompanyFilter(value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-white pb-20 pt-10">
        <OffersTable />
      </div>
    </main>
  );
}
