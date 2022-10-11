import { useState } from 'react';
import type { TypeaheadOption } from '@tih/ui';
import { Typeahead } from '@tih/ui';

import { trpc } from '~/utils/trpc';

type Props = Readonly<{
  disabled?: boolean;
  isLabelHidden?: boolean;
  onSelect: (option: TypeaheadOption) => void;
  placeHolder?: string;
}>;

export default function CompaniesTypeahead({
  disabled,
  onSelect,
  isLabelHidden,
  placeHolder,
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
      placeholder={placeHolder}
      onQueryChange={setQuery}
      onSelect={onSelect}
    />
  );
}
