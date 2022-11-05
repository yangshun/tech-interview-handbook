import type { ComponentProps } from 'react';
import { useState } from 'react';
import type { TypeaheadOption } from '@tih/ui';
import { Typeahead } from '@tih/ui';

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
  }>;

export default function ResumeExperienceTypeahead({
  onSelect,
  selectedValues = new Set(),
  ...props
}: Props) {
  const [query, setQuery] = useState('');
  const options = EXPERIENCES.filter(
    ({ value }) => !selectedValues.has(value),
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
      onQueryChange={setQuery}
      onSelect={onSelect}
      {...props}
    />
  );
}
