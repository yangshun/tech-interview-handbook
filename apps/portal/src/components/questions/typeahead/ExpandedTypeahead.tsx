import type { ComponentProps } from 'react';
import { Button, Typeahead } from '@tih/ui';

import type { RequireAllOrNone } from '~/utils/questions/RequireAllOrNone';

type TypeaheadProps = ComponentProps<typeof Typeahead>;
type TypeaheadOption = TypeaheadProps['options'][number];

export type ExpandedTypeaheadProps = RequireAllOrNone<{
  onSuggestionClick: (option: TypeaheadOption) => void;
  suggestedCount: number;
}> &
  TypeaheadProps;

export default function ExpandedTypeahead({
  suggestedCount = 0,
  onSuggestionClick,
  ...typeaheadProps
}: ExpandedTypeaheadProps) {
  const suggestions = typeaheadProps.options.slice(0, suggestedCount);

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
        <Typeahead {...typeaheadProps} />
      </div>
    </div>
  );
}
