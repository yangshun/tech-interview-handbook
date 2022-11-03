import type { ComponentProps } from 'react';
import { useState } from 'react';
import type { TypeaheadOption } from '@tih/ui';
import { Typeahead } from '@tih/ui';

import { trpc } from '~/utils/trpc';

type BaseProps = Pick<
  ComponentProps<typeof Typeahead>,
  | 'disabled'
  | 'errorMessage'
  | 'isLabelHidden'
  | 'placeholder'
  | 'required'
  | 'textSize'
>;

type Props = BaseProps &
  Readonly<{
    label?: string;
    onSelect: (option: TypeaheadOption | null) => void;
    value?: TypeaheadOption | null;
  }>;

export default function CitiesTypeahead({
  label = 'City',
  onSelect,
  value,
  ...props
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
      value={value}
      onQueryChange={setQuery}
      onSelect={onSelect}
      {...props}
    />
  );
}
