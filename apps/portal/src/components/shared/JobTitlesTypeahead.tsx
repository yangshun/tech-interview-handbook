import type { ComponentProps } from 'react';
import { useState } from 'react';
import type { TypeaheadOption } from '~/ui';
import { Typeahead } from '~/ui';

import useJobTitleOptions from '~/utils/shared/useJobTitleOptions';

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
    noResultsMessage?: string;
    onSelect: (option: TypeaheadOption | null) => void;
    value?: TypeaheadOption | null;
  }>;

export default function JobTitlesTypeahead({
  excludedValues,
  label: labelProp = 'Job Title',
  noResultsMessage = 'No available job titles.',
  onSelect,
  value,
  ...props
}: Props) {
  const [query, setQuery] = useState('');
  const jobTitleOptions = useJobTitleOptions(query);
  const options = jobTitleOptions.filter(
    (option) => !excludedValues?.has(option.value),
  );

  return (
    <Typeahead
      label={labelProp}
      noResultsMessage={noResultsMessage}
      nullable={true}
      options={options}
      value={value}
      onQueryChange={setQuery}
      onSelect={onSelect}
      {...props}
    />
  );
}
