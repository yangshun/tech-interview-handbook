import { useState } from 'react';
import type { TypeaheadOption } from '@tih/ui';
import { Typeahead } from '@tih/ui';

import { trpc } from '~/utils/trpc';

type Props = Readonly<{
  disabled?: boolean;
  errorMessage?: string;
  isLabelHidden?: boolean;
  label?: string;
  onSelect: (option: TypeaheadOption | null) => void;
  placeholder?: string;
  required?: boolean;
  value?: TypeaheadOption | null;
}>;

export default function CitiesTypeahead({
  disabled,
  label = 'City',
  onSelect,
  isLabelHidden,
  placeholder,
  required,
  value,
}: Props) {
  const [query, setQuery] = useState('');
  const cities = trpc.useQuery([
    'locations.cities.list',
    {
      name: query,
    },
  ]);

  const { data } = cities;

  return (
    <Typeahead
      disabled={disabled}
      isLabelHidden={isLabelHidden}
      label={label}
      noResultsMessage="No cities found"
      nullable={true}
      options={
        data?.map(({ id, name, state }) => ({
          id,
          label: `${name}, ${state?.name}, ${state?.country?.name}`,
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
