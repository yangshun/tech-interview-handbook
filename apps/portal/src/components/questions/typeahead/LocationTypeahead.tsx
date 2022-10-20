import { LOCATIONS } from '~/utils/questions/constants';

import type { ExpandedTypeaheadProps } from './ExpandedTypeahead';
import ExpandedTypeahead from './ExpandedTypeahead';

export type LocationTypeaheadProps = Omit<
  ExpandedTypeaheadProps,
  'label' | 'options'
>;

export default function LocationTypeahead(props: LocationTypeaheadProps) {
  return (
    <ExpandedTypeahead
      {...(props as ExpandedTypeaheadProps)}
      label="Location"
      options={LOCATIONS}
    />
  );
}
