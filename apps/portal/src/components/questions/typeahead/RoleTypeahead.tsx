import { ROLES } from '~/utils/questions/constants';

import type { ExpandedTypeaheadProps } from './ExpandedTypeahead';
import ExpandedTypeahead from './ExpandedTypeahead';

export type RoleTypeaheadProps = Omit<
  ExpandedTypeaheadProps,
  'label' | 'onQueryChange' | 'options'
>;

export default function RoleTypeahead(props: RoleTypeaheadProps) {
  return (
    <ExpandedTypeahead
      {...(props as ExpandedTypeaheadProps)}
      label="Role"
      options={ROLES}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onQueryChange={() => {}}
    />
  );
}
