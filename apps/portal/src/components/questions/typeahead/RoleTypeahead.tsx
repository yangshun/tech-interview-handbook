import { useState } from 'react';

import { JobTitleLabels } from '~/components/shared/JobTitles';

import type { ExpandedTypeaheadProps } from './ExpandedTypeahead';
import ExpandedTypeahead from './ExpandedTypeahead';
import type { FilterChoices } from '../filter/FilterSection';

export type RoleTypeaheadProps = Omit<
  ExpandedTypeaheadProps,
  'label' | 'onQueryChange' | 'options'
>;

const ROLES: FilterChoices = Object.entries(JobTitleLabels)
  .map(([slug, { label, ranking }]) => ({
    id: slug,
    label,
    ranking,
    value: slug,
  }))
  .sort((a, b) => b.ranking - a.ranking);

export default function RoleTypeahead(props: RoleTypeaheadProps) {
  const [query, setQuery] = useState('');

  return (
    <ExpandedTypeahead
      {...(props as ExpandedTypeaheadProps)}
      label="Role"
      options={ROLES.filter((option) =>
        option.label
          .toLocaleLowerCase()
          .includes(query.trim().toLocaleLowerCase()),
      )}
      onQueryChange={setQuery}
    />
  );
}
