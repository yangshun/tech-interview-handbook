import { useState } from 'react';
import type { TypeaheadOption } from '@tih/ui';

import CompaniesTypeahead from '~/components/global/CompaniesTypeahead';

export default function HomePage() {
  const [selectedCompany, setSelectedCompany] =
    useState<TypeaheadOption | null>(null);

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
        </div>
      </div>
    </main>
  );
}
