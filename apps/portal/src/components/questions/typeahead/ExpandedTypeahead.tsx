import type { ComponentProps } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { Button, Typeahead } from '@tih/ui';

import type { RequireAllOrNone } from '~/utils/questions/RequireAllOrNone';

type TypeaheadProps = ComponentProps<typeof Typeahead>;
type TypeaheadOption = TypeaheadProps['options'][number];

export type ExpandedTypeaheadProps = Omit<TypeaheadProps, 'onSelect'> &
  RequireAllOrNone<{
    clearOnSelect?: boolean;
    filterOption: (option: TypeaheadOption) => boolean;
    onSuggestionClick: (option: TypeaheadOption) => void;
    suggestedCount: number;
  }> & {
    onChange?: unknown; // Workaround: This prop is here just to absorb the onChange returned react-hook-form
    onSelect: (option: TypeaheadOption) => void;
  };

export default function ExpandedTypeahead({
  suggestedCount = 0,
  onSuggestionClick,
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
    () => filteredOptions.slice(0, suggestedCount),
    [filteredOptions, suggestedCount],
  );

  return (
    <div className="flex flex-wrap gap-x-2">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion.id}
          label={suggestion.label}
          variant="tertiary"
          onClick={() => {
            onSuggestionClick?.(suggestion);
          }}
        />
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
            // TODO: Remove onSelect null coercion once onSelect prop is refactored
            onSelect(option!);
          }}
        />
      </div>
    </div>
  );
}
