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

export default function CompaniesTypeahead({
  onSelect,
  value,
  ...props
}: Props) {
  const [query, setQuery] = useState('');
  const companies = trpc.useQuery([
    'companies.list',
    {
      name: query,
    },
  ]);

  const { data, isLoading } = companies;

  return (
    <Typeahead
      isLoading={isLoading}
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
      value={value}
      onQueryChange={setQuery}
      onSelect={onSelect}
      {...props}
    />
  );
}
