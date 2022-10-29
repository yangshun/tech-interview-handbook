import { useState } from 'react';
import type { TypeaheadOption } from '@tih/ui';
import { Button } from '@tih/ui';
import { useToast } from '@tih/ui';
import { HorizontalDivider } from '@tih/ui';

import CompaniesTypeahead from '~/components/shared/CompaniesTypeahead';
import JobTitlesTypeahead from '~/components/shared/JobTitlesTypahead';
import type {
  Month,
  MonthYearOptional,
} from '~/components/shared/MonthYearPicker';
import MonthYearPicker from '~/components/shared/MonthYearPicker';

export default function HomePage() {
  const [selectedCompany, setSelectedCompany] =
    useState<TypeaheadOption | null>(null);
  const [selectedJobTitle, setSelectedJobTitle] =
    useState<TypeaheadOption | null>(null);

  const [monthYear, setMonthYear] = useState<MonthYearOptional>({
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
          <JobTitlesTypeahead
            onSelect={(option) => setSelectedJobTitle(option)}
          />
          <pre>{JSON.stringify(selectedJobTitle, null, 2)}</pre>
          <HorizontalDivider />
          <MonthYearPicker
            errorMessage={
              monthYear.month == null || monthYear.year == null
                ? 'Incomplete date'
                : undefined
            }
            value={monthYear}
            onChange={setMonthYear}
          />
          <Button
            label="Clear dates"
            size="sm"
            variant="tertiary"
            onClick={() => {
              setMonthYear({ month: null, year: null });
            }}
          />
          <pre>{JSON.stringify(monthYear, null, 2)}</pre>
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
