import type { ComponentProps } from 'react';
import { Typeahead } from '@tih/ui';

import { ROLES } from '~/utils/questions/constants';

type TypeaheadProps = ComponentProps<typeof Typeahead>;

export type RoleTypeaheadProps = Omit<TypeaheadProps, 'label' | 'options'>;

export default function RoleTypeahead(props: RoleTypeaheadProps) {
  return <Typeahead label="Role" options={ROLES} {...props} />;
}
