import { useMemo } from 'react';

import { trpc } from '../trpc';

export default function useLocationOptions(query: string) {
  const { data: locations, ...restQuery } = trpc.useQuery([
    'locations.cities.list',
    {
      name: query,
    },
  ]);

  const locationOptions = useMemo(() => {
    return (
      locations?.map(({ id, name, state }) => ({
        cityId: id,
        countryId: state.country.id,
        id,
        label: `${name}, ${state.name}, ${state.country.name}`,
        stateId: state.id,
        value: id,
      })) ?? []
    );
  }, [locations]);

  return {
    data: locationOptions,
    ...restQuery,
  };
}
