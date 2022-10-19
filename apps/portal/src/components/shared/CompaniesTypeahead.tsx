import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Typeahead } from '@tih/ui';

import { trpc } from '~/utils/trpc';

type TypeaheadProps = ComponentProps<typeof Typeahead>;

type Props = Omit<
  TypeaheadProps,
  'noResultsMessage' | 'onQueryChange' | 'options' | 'query'
> &
  Partial<Pick<TypeaheadProps, 'noResultsMessage'>> &
  (
    | Required<Pick<TypeaheadProps, 'onQueryChange' | 'query'>>
    | {
        onQueryChange?: never;
        query?: never;
      }
  );

export default function CompaniesTypeahead({
  query: queryProp,
  onQueryChange,
  nullable = true,
  ...typeaheadProps
}: Props) {
  const [queryState, setQuery] = useState('');
  const query = queryProp ?? queryState;
  const companies = trpc.useQuery([
    'companies.list',
    {
      name: query,
    },
  ]);

  const { data } = companies;

  return (
    <Typeahead
      {...typeaheadProps}
      noResultsMessage="No companies found"
      nullable={nullable}
      options={
        data?.map(({ id, name }) => ({
          id,
          label: name,
          value: id,
        })) ?? []
      }
      query={query}
      onQueryChange={onQueryChange ?? setQuery}
    />
  );
}
