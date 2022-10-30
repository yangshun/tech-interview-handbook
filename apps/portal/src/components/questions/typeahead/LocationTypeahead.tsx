import { useMemo, useState } from 'react';
import type { TypeaheadOption } from '@tih/ui';

import { trpc } from '~/utils/trpc';

import type { ExpandedTypeaheadProps } from './ExpandedTypeahead';
import ExpandedTypeahead from './ExpandedTypeahead';

import type { Location } from '~/types/questions';

export type LocationTypeaheadProps = Omit<
  ExpandedTypeaheadProps,
  'label' | 'onQueryChange' | 'onSelect' | 'onSuggestionClick' | 'options'
> & {
  onSelect: (option: Location & TypeaheadOption) => void;
  onSuggestionClick?: (option: Location) => void;
};

export default function LocationTypeahead({
  onSelect,
  onSuggestionClick,
  ...restProps
}: LocationTypeaheadProps) {
  const [query, setQuery] = useState('');

  const { data: locations } = trpc.useQuery([
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

  return (
    <ExpandedTypeahead
      {...({
        onSuggestionClick: onSuggestionClick
          ? (option: TypeaheadOption) => {
              const location = locationOptions.find(
                (locationOption) => locationOption.id === option.id,
              )!;
              onSuggestionClick({
                ...location,
                ...option,
              });
            }
          : undefined,
        ...restProps,
      } as ExpandedTypeaheadProps)}
      label="Location"
      options={locationOptions}
      onQueryChange={setQuery}
      onSelect={({ id }: TypeaheadOption) => {
        const location = locationOptions.find((option) => option.id === id)!;
        onSelect(location);
      }}
    />
  );
}
