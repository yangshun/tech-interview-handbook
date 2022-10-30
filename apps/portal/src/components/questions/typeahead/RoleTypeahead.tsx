import { JobTitleLabels } from '~/components/shared/JobTitles';

import type { ExpandedTypeaheadProps } from './ExpandedTypeahead';
import ExpandedTypeahead from './ExpandedTypeahead';
import type { FilterChoices } from '../filter/FilterSection';

export type RoleTypeaheadProps = Omit<
  ExpandedTypeaheadProps,
  'label' | 'onQueryChange' | 'options'
>;

const ROLES: FilterChoices = Object.entries(JobTitleLabels).map(
  ([slug, label]) => ({
    id: slug,
    label,
    value: slug,
  }),
);
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
