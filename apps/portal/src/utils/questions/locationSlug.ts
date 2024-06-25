import type { TypeaheadOption } from '~/ui';

import type { Location } from '~/types/questions';

export function locationOptionToSlug(
  value: Location & TypeaheadOption,
): string {
  return [
    value.countryId,
    value.stateId,
    value.cityId,
    value.id,
    value.label,
    value.value,
  ].join('-');
}
