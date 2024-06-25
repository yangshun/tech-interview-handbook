import type { ComponentProps } from 'react';
import { useState } from 'react';
import type { TypeaheadOption } from '~/ui';
import { Typeahead } from '~/ui';

import useCountryOptions from '~/utils/shared/useCountryOptions';

type BaseProps = Pick<
  ComponentProps<typeof Typeahead>,
  | 'disabled'
  | 'errorMessage'
  | 'isLabelHidden'
  | 'placeholder'
  | 'required'
  | 'textSize'
>;

type Props = BaseProps &
  Readonly<{
    excludedValues?: Set<string>;
    label?: string;
    onSelect: (option: TypeaheadOption | null) => void;
    value?: TypeaheadOption | null;
  }>;

export default function CountriesTypeahead({
  excludedValues,
  label = 'Country',
  onSelect,
  value,
  ...props
}: Props) {
  const [query, setQuery] = useState('');
  const { data: countryOptions, isLoading } = useCountryOptions(query);

  return (
    <Typeahead
      isLoading={isLoading}
      label={label}
      noResultsMessage="No countries found"
      nullable={true}
      options={countryOptions.filter(
        (option) => !excludedValues?.has(option.value),
      )}
      value={value}
      onQueryChange={setQuery}
      onSelect={onSelect}
      {...props}
    />
  );
}
