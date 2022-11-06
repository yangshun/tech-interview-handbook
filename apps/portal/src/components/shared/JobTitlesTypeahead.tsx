import type { ComponentProps } from 'react';
import { useState } from 'react';
import type { TypeaheadOption } from '@tih/ui';
import { Typeahead } from '@tih/ui';

import { JobTitleLabels } from './JobTitles';

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
  const options = Object.entries(JobTitleLabels)
    .map(([slug, { label, ranking }]) => ({
      id: slug,
      label,
      ranking,
      value: slug,
    }))
    .filter(({ label }) =>
      label.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
    )
    .filter((option) => !excludedValues?.has(option.value))
    .sort((a, b) => b.ranking - a.ranking);

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
