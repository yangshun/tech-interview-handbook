import { useState } from 'react';
import type { TypeaheadOption } from '~/ui';

import useLocationOptions from '~/utils/questions/useLocationOptions';

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

  const { data: locationOptions, isLoading } = useLocationOptions(query);

  return (
    <ExpandedTypeahead
      isLoading={isLoading}
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
