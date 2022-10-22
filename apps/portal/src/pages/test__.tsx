import { useState } from 'react';
import type { TypeaheadOption } from '@tih/ui';
import { Button } from '@tih/ui';
import { useToast } from '@tih/ui';
import { HorizontalDivider } from '@tih/ui';

import CompaniesTypeahead from '~/components/shared/CompaniesTypeahead';
import type { Month, MonthYear } from '~/components/shared/MonthYearPicker';
import MonthYearPicker from '~/components/shared/MonthYearPicker';

export default function HomePage() {
  const [selectedCompany, setSelectedCompany] =
    useState<TypeaheadOption | null>(null);
  const [monthYear, setMonthYear] = useState<MonthYear>({
    month: (new Date().getMonth() + 1) as Month,
    year: new Date().getFullYear(),
  });

  const { showToast } = useToast();

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="flex h-full items-center justify-center">
        <div className="space-y-4">
          <h1 className="text-primary-600 text-center text-4xl font-bold">
            Test Page
          </h1>
          <CompaniesTypeahead
            onSelect={(option) => setSelectedCompany(option)}
          />
          <pre>{JSON.stringify(selectedCompany, null, 2)}</pre>
          <HorizontalDivider />
          <MonthYearPicker value={monthYear} onChange={setMonthYear} />
          <HorizontalDivider />
          <Button
            label="Add toast"
            variant="primary"
            onClick={() => {
              showToast({
                // Duration: 10000 (optional)
                subtitle: `Some optional subtitle ${Date.now()}`,
                title: `Hello World ${Date.now()}`,
                variant: 'success',
              });
            }}
          />
        </div>
      </div>
    </main>
  );
}
