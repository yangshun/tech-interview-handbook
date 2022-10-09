import { useState } from 'react';
import type { TypeaheadOption } from '@tih/ui';
import { Typeahead } from '@tih/ui';

import { trpc } from '~/utils/trpc';

type Props = Readonly<{
  disabled?: boolean;
  onSelect: (option: TypeaheadOption) => void;
}>;

export default function CompaniesTypeahead({ disabled, onSelect }: Props) {
  const [query, setQuery] = useState('');
  const companies = trpc.useQuery([
    'companies.list',
    {
      name: query,
    },
  ]);

  const { data } = companies;

  return (
    <Typeahead
      disabled={disabled}
      label="Company"
      noResultsMessage="No companies found"
      nullable={true}
      options={
        data?.map(({ id, name }) => ({
          id,
          label: name,
          value: id,
        })) ?? []
      }
      onQueryChange={setQuery}
      onSelect={onSelect}
    />
  );
}
