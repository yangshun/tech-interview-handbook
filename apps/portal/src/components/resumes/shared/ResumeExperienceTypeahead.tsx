import type { ComponentProps } from 'react';
import { useState } from 'react';
import type { TypeaheadOption } from '~/ui';
import { Typeahead } from '~/ui';

import { EXPERIENCES } from '~/utils/resumes/resumeFilters';

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

export default function ResumeExperienceTypeahead({
  onSelect,
  selectedValues = new Set(),
  value,
  ...props
}: Props) {
  const [query, setQuery] = useState('');
  const options = EXPERIENCES.filter(
    (option) => !selectedValues.has(option.value),
  ).filter(
    ({ label }) =>
      label.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1,
  );

  return (
    <Typeahead
      label="Experiences"
      noResultsMessage="No available experiences."
      nullable={true}
      options={options}
      value={value}
      onQueryChange={setQuery}
      onSelect={onSelect}
      {...props}
    />
  );
}
