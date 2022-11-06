import { useState } from 'react';

import useJobTitleOptions from '~/utils/shared/useJobTitleOptions';

import type { ExpandedTypeaheadProps } from './ExpandedTypeahead';
import ExpandedTypeahead from './ExpandedTypeahead';

export type RoleTypeaheadProps = Omit<
  ExpandedTypeaheadProps,
  'label' | 'onQueryChange' | 'options'
>;

export default function RoleTypeahead(props: RoleTypeaheadProps) {
  const [query, setQuery] = useState('');

  const roleOptions = useJobTitleOptions(query);

  return (
    <ExpandedTypeahead
      {...(props as ExpandedTypeaheadProps)}
      label="Role"
      options={roleOptions.filter((option) =>
        option.label
          .toLocaleLowerCase()
          .includes(query.trim().toLocaleLowerCase()),
      )}
      onQueryChange={setQuery}
    />
  );
}
