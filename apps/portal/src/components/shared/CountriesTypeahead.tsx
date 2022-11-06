import type { ComponentProps } from 'react';
import { useState } from 'react';
import type { Country } from '@prisma/client';
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
    excludedValues?: Set<string>;
    label?: string;
    onSelect: (option: TypeaheadOption | null) => void;
    value?: TypeaheadOption | null;
  }>;

function stringPositionComparator(a: string, b: string, query: string): number {
  const normalizedQueryString = query.trim().toLocaleLowerCase();
  const positionA = a.toLocaleLowerCase().indexOf(normalizedQueryString);
  const positionB = b.toLocaleLowerCase().indexOf(normalizedQueryString);
  return (
    (positionA === -1 ? 9999 : positionA) -
    (positionB === -1 ? 9999 : positionB)
  );
}

export function useCompareCountry(query: string) {
  return (a: Country, b: Country) => {
    const normalizedQueryString = query.trim().toLocaleLowerCase();
    if (
      a.code.toLocaleLowerCase() === normalizedQueryString ||
      b.code.toLocaleLowerCase() === normalizedQueryString
    ) {
      return stringPositionComparator(a.code, b.code, normalizedQueryString);
    }

    return stringPositionComparator(a.name, b.name, normalizedQueryString);
  };
}

export function useCountryOptions(query: string) {
  const countries = trpc.useQuery([
    'locations.countries.list',
    {
      name: query,
    },
  ]);

  const { data, ...restQuery } = countries;

  const compareCountry = useCompareCountry(query);

  const countryOptions = (data ?? [])
    // Client-side sorting by position of query string appearing
    // in the country name since we can't do that in Prisma.
    .sort(compareCountry)
    .map(({ id, name }) => ({
      id,
      label: name,
      value: id,
    }));

  return {
    ...restQuery,
    data: countryOptions,
  };
}

export default function CountriesTypeahead({
  excludedValues,
  label = 'Country',
  onSelect,
  value,
  ...props
}: Props) {
  const [query, setQuery] = useState('');
  const { data: countryOptions, isLoading } = useCountryOptions(query);

  return (
    <Typeahead
      isLoading={isLoading}
      label={label}
      noResultsMessage="No countries found"
      nullable={true}
      options={countryOptions.filter(
        (option) => !excludedValues?.has(option.value),
      )}
      value={value}
      onQueryChange={setQuery}
      onSelect={onSelect}
      {...props}
    />
  );
}
