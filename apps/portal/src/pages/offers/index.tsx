import { useState } from 'react';
import { Select } from '@tih/ui';

import OffersTable from '~/components/offers/OffersTable';
import OffersTitle from '~/components/offers/OffersTitle';

export default function OffersHomePage() {
  const [jobTitleFilter, setjobTitleFilter] = useState('Software engineers');
  const [companyFilter, setCompanyFilter] = useState('All companies');

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="grid-rows grid h-1/3 bg-gray-100">
        <OffersTitle />
        <div className="flex items-start justify-center">
          <div className="flex items-center">
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
            <div className="mx-4">
              <Select
                isLabelHidden={true}
                label="Select a company"
                options={[
                  {
                    label: 'All companies',
                    value: 'All companies',
                  },
                  {
                    label: 'Shopee',
                    value: 'Shopee',
                  },
                  {
                    label: 'Meta',
                    value: 'Meta',
                  },
                ]}
                value={companyFilter}
                onChange={setCompanyFilter}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <OffersTable />
      </div>
    </main>
  );
}
