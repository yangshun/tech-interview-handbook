import { useState } from 'react';
import type { TypeaheadOption } from '@tih/ui';
import { Typeahead } from '@tih/ui';

import { JobTitleLabels } from './JobTitles';

type Props = Readonly<{
  disabled?: boolean;
  isLabelHidden?: boolean;
  onSelect: (option: TypeaheadOption) => void;
  placeHolder?: string;
  required?: boolean;
}>;

export default function JobTitlesTypeahead({
  disabled,
  onSelect,
  isLabelHidden,
  placeHolder,
  required,
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
      disabled={disabled}
      isLabelHidden={isLabelHidden}
      label="Job Title"
      noResultsMessage="No available job titles."
      nullable={true}
      options={options}
      placeholder={placeHolder}
      required={required}
      onQueryChange={setQuery}
      onSelect={onSelect}
    />
  );
}
