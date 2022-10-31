import type { FilterChoice } from '~/components/questions/filter/FilterSection';

import { trpc } from '../trpc';

import type { Location } from '~/types/questions';

export default function useDefaultLocation():
  | (FilterChoice & Location)
  | undefined {
  const { data: locations } = trpc.useQuery([
    'locations.cities.list',
    {
      name: 'singapore',
    },
  ]);

  if (locations === undefined) {
    return undefined;
  }

  const { id, name, state } = locations[0];

  return {
    cityId: id,
    countryId: state.country.id,
    id,
    label: `${name}, ${state.name}, ${state.country.name}`,
    stateId: state.id,
    value: id,
  };
}
