import { useState } from 'react';

import useCompanyOptions from '~/utils/shared/useCompanyOptions';

import type { ExpandedTypeaheadProps } from './ExpandedTypeahead';
import ExpandedTypeahead from './ExpandedTypeahead';

export type CompanyTypeaheadProps = Omit<
  ExpandedTypeaheadProps,
  'label' | 'onQueryChange' | 'options'
>;

export default function CompanyTypeahead(props: CompanyTypeaheadProps) {
  const [query, setQuery] = useState('');

  const { data: companyOptions, isLoading } = useCompanyOptions(query);

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
