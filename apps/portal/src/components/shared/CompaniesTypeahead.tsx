import { useState } from 'react';
import type { TypeaheadOption } from '@tih/ui';
import { Typeahead } from '@tih/ui';

import { trpc } from '~/utils/trpc';

type Props = Readonly<{
  disabled?: boolean;
  errorMessage?: string;
  isLabelHidden?: boolean;
  onSelect: (option: TypeaheadOption | null) => void;
  placeholder?: string;
  required?: boolean;
  value?: TypeaheadOption | null;
}>;

export default function CompaniesTypeahead({
  disabled,
  onSelect,
  isLabelHidden,
  placeholder,
  required,
  value,
}: Props) {
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
      isLabelHidden={isLabelHidden}
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
      placeholder={placeholder}
      required={required}
      textSize="inherit"
      value={value}
      onQueryChange={setQuery}
      onSelect={onSelect}
    />
  );
}
