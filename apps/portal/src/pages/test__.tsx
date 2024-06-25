import { useState } from 'react';
import type { TypeaheadOption } from '~/ui';
import { Button } from '~/ui';
import { useToast } from '~/ui';
import { HorizontalDivider } from '~/ui';

import CitiesTypeahead from '~/components/shared/CitiesTypeahead';
import CompaniesTypeahead from '~/components/shared/CompaniesTypeahead';
import CountriesTypeahead from '~/components/shared/CountriesTypeahead';
import JobTitlesTypeahead from '~/components/shared/JobTitlesTypeahead';
import type {
  Month,
  MonthYearOptional,
} from '~/components/shared/MonthYearPicker';
import MonthYearPicker from '~/components/shared/MonthYearPicker';

export default function HomePage() {
  const [selectedCompany, setSelectedCompany] =
    useState<TypeaheadOption | null>(null);
  const [selectedCountry, setSelectedCountry] =
    useState<TypeaheadOption | null>(null);
  const [selectedCity, setSelectedCity] = useState<TypeaheadOption | null>(
    null,
  );
  const [selectedJobTitle, setSelectedJobTitle] =
    useState<TypeaheadOption | null>(null);

  const [monthYear, setMonthYear] = useState<MonthYearOptional>({
    month: (new Date().getMonth() + 1) as Month,
    year: new Date().getFullYear(),
  });

  const { showToast } = useToast();

  return (
    <main className="mx-auto max-w-5xl flex-1 overflow-y-auto py-24">
      <h1 className="text-primary-600 text-center text-4xl font-bold">
        Test Page
      </h1>
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div className="space-y-4">
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
          <CountriesTypeahead
            onSelect={(option) => setSelectedCountry(option)}
          />
          <pre>{JSON.stringify(selectedCountry, null, 2)}</pre>
          <HorizontalDivider />
          <CitiesTypeahead onSelect={(option) => setSelectedCity(option)} />
          <pre>{JSON.stringify(selectedCity, null, 2)}</pre>
        </div>
        <div className="space-y-4">
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
