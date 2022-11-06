import { useMemo, useState } from 'react';

import { trpc } from '~/utils/trpc';

import type { ExpandedTypeaheadProps } from './ExpandedTypeahead';
import ExpandedTypeahead from './ExpandedTypeahead';

export type CompanyTypeaheadProps = Omit<
  ExpandedTypeaheadProps,
  'label' | 'onQueryChange' | 'options'
>;

export default function CompanyTypeahead(props: CompanyTypeaheadProps) {
  const [query, setQuery] = useState('');

  const { data: companies, isLoading } = trpc.useQuery([
    'companies.list',
    {
      name: query,
    },
  ]);

  const companyOptions = useMemo(() => {
    return (
      companies?.map(({ id, name }) => ({
        id,
        label: name,
        value: id,
      })) ?? []
    );
  }, [companies]);

  return (
    <ExpandedTypeahead
      {...(props as ExpandedTypeaheadProps)}
      isLoading={isLoading}
      label="Company"
      options={companyOptions}
      onQueryChange={setQuery}
    />
  );
}
