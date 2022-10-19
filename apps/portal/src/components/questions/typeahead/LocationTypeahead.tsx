import type { ComponentProps } from 'react';
import { Typeahead } from '@tih/ui';

import { LOCATIONS } from '~/utils/questions/constants';

type TypeaheadProps = ComponentProps<typeof Typeahead>;

export type LocationTypeaheadProps = Omit<TypeaheadProps, 'label' | 'options'>;

export default function LocationTypeahead(props: LocationTypeaheadProps) {
  return <Typeahead label="Location" options={LOCATIONS} {...props} />;
}
