import type { ComponentProps } from 'react';
import { useState } from 'react';
import type { TypeaheadOption } from '@tih/ui';
import { Typeahead } from '@tih/ui';

import { JobTitleLabels } from '~/components/shared/JobTitles';

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
    selectedValues?: Set<string>;
    value?: TypeaheadOption | null;
  }>;

export default function ResumeRoleTypeahead({
  onSelect,
  selectedValues = new Set(),
  value,
  ...props
}: Props) {
  const [query, setQuery] = useState('');
  const options = Object.entries(JobTitleLabels)
    .map(([slug, { label }]) => ({
      id: slug,
      label,
      value: slug,
    }))
    .filter((option) => !selectedValues.has(option.value))
    .filter(
      ({ label }) =>
        label.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1,
    );

  return (
    <Typeahead
      label="Role"
      noResultsMessage="No available roles."
      nullable={true}
      options={options}
      value={value}
      onQueryChange={setQuery}
      onSelect={onSelect}
      {...props}
    />
  );
}
