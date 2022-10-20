import { useState } from 'react';
import type { TypeaheadOption } from '@tih/ui';
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

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="flex h-full items-center justify-center">
        <div className="space-y-4">
          <h1 className="text-primary-600 text-center text-4xl font-bold">
            Homepage
          </h1>
          <CompaniesTypeahead
            onSelect={(option) => setSelectedCompany(option)}
          />
          <pre>{JSON.stringify(selectedCompany, null, 2)}</pre>
          <HorizontalDivider />
          <MonthYearPicker value={monthYear} onChange={setMonthYear} />
        </div>
      </div>
    </main>
  );
}
