import type { ComponentProps } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { Button, Typeahead } from '~/ui';

import type { RequireAllOrNone } from '~/utils/questions/RequireAllOrNone';

type TypeaheadProps = ComponentProps<typeof Typeahead>;
type TypeaheadOption = TypeaheadProps['options'][number];

export type ExpandedTypeaheadProps = Omit<
  TypeaheadProps,
  'nullable' | 'onSelect'
> &
  RequireAllOrNone<{
    onSuggestionClick: (option: TypeaheadOption) => void;
    suggestedCount: number;
    suggestedOptions: Array<TypeaheadOption>;
  }> & {
    clearOnSelect?: boolean;
    filterOption?: (option: TypeaheadOption) => boolean;
    onChange?: unknown; // Workaround: This prop is here just to absorb the onChange returned react-hook-form
    onSelect: (option: TypeaheadOption) => void;
  };

export default function ExpandedTypeahead({
  suggestedCount = 0,
  onSuggestionClick,
  suggestedOptions = [],
  filterOption = () => true,
  clearOnSelect = false,
  options,
  onSelect,
  onChange: _,
  ...typeaheadProps
}: ExpandedTypeaheadProps) {
  const [key, setKey] = useState(0);
  const filteredOptions = useMemo(() => {
    return options.filter(filterOption);
  }, [options, filterOption]);
  const suggestions = useMemo(
    () => suggestedOptions.slice(0, suggestedCount),
    [suggestedOptions, suggestedCount],
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      {suggestions.map((suggestion) => (
        <div key={suggestion.id} className="hidden lg:block">
          <Button
            label={suggestion.label}
            size="sm"
            variant="tertiary"
            onClick={() => {
              onSuggestionClick?.(suggestion);
            }}
          />
        </div>
      ))}
      <div className="flex-1">
        <Typeahead
          key={key}
          options={filteredOptions}
          {...typeaheadProps}
          onSelect={(option) => {
            if (clearOnSelect) {
              setKey((key + 1) % 2);
            }
            onSelect(option);
          }}
        />
      </div>
    </div>
  );
}
