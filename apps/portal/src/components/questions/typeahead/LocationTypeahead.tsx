import { LOCATIONS } from '~/utils/questions/constants';

import type { ExpandedTypeaheadProps } from './ExpandedTypeahead';
import ExpandedTypeahead from './ExpandedTypeahead';

export type LocationTypeaheadProps = Omit<
  ExpandedTypeaheadProps,
  'label' | 'onQueryChange' | 'options'
>;

export default function LocationTypeahead(props: LocationTypeaheadProps) {
  return (
    <ExpandedTypeahead
      {...(props as ExpandedTypeaheadProps)}
      label="Location"
      options={LOCATIONS}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onQueryChange={() => {}}
    />
  );
}
