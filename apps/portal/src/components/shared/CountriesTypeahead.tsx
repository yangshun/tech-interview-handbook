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
    onSelect: (option: TypeaheadOption | null) => void;
    value?: TypeaheadOption | null;
  }>;

export default function CountriesTypeahead({
  onSelect,
  value,
  ...props
}: Props) {
  const [query, setQuery] = useState('');
  const countries = trpc.useQuery([
    'locations.countries.list',
    {
      name: query,
    },
  ]);

  const { data } = countries;

  return (
    <Typeahead
      label="Country"
      minQueryLength={2}
      noResultsMessage="No countries found"
      nullable={true}
      options={(data ?? [])
        // Client-side sorting by position of query string appearing
        // in the country name since we can't do that in Prisma.
        .sort(
          (a, b) =>
            a.name.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) -
            b.name.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()),
        )
        .map(({ id, name }) => ({
          id,
          label: name,
          value: id,
        }))}
      value={value}
      onQueryChange={setQuery}
      onSelect={onSelect}
      {...props}
    />
  );
}
