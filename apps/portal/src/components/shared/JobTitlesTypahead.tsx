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
    .map(([slug, label]) => ({
      id: slug,
      label,
      value: slug,
    }))
    .filter(
      ({ label }) =>
        label.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1,
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
