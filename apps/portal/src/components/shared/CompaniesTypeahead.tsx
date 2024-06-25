import type { ComponentProps } from 'react';
import { useState } from 'react';
import type { TypeaheadOption } from '~/ui';
import { Typeahead } from '~/ui';

import useCompanyOptions from '~/utils/shared/useCompanyOptions';

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

  const { data: companyOptions, isLoading } = useCompanyOptions(query);

  return (
    <Typeahead
      isLoading={isLoading}
      label="Company"
      noResultsMessage="No companies found"
      nullable={true}
      options={companyOptions}
      value={value}
      onQueryChange={setQuery}
      onSelect={onSelect}
      {...props}
    />
  );
}
