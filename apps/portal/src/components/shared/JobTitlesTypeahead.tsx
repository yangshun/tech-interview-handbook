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
    onSelect: (option: TypeaheadOption | null) => void;
    value?: TypeaheadOption | null;
  }>;

export default function JobTitlesTypeahead({
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
    .sort((a, b) => b.ranking - a.ranking)
    .filter(({ label }) =>
      label.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
    );

  return (
    <Typeahead
      label="Job Title"
      noResultsMessage="No available job titles."
      nullable={true}
      options={options}
      value={value}
      onQueryChange={setQuery}
      onSelect={onSelect}
      {...props}
    />
  );
}
