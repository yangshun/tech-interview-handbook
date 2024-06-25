import type { ComponentProps } from 'react';
import { useState } from 'react';
import type { TypeaheadOption } from '~/ui';
import { Typeahead } from '~/ui';

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

export function useCityOptions(query: string) {
  const { data, ...restQuery } = trpc.useQuery([
    'locations.cities.list',
    {
      name: query,
    },
  ]);

  return {
    data:
      data?.map(({ id, name, state }) => ({
        id,
        label: `${name}, ${state?.name}, ${state?.country?.name}`,
        value: id,
      })) ?? [],
    ...restQuery,
  };
}

export default function CitiesTypeahead({
  label = 'City',
  onSelect,
  value,
  ...props
}: Props) {
  const [query, setQuery] = useState('');

  const { data: cityOptions, isLoading } = useCityOptions(query);

  return (
    <Typeahead
      isLoading={isLoading}
      label={label}
      minQueryLength={3}
      noResultsMessage="No cities found"
      nullable={true}
      options={cityOptions}
      value={value}
      onQueryChange={setQuery}
      onSelect={onSelect}
      {...props}
    />
  );
}
