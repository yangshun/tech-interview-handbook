import type { ComponentProps } from 'react';
import { useMemo, useState } from 'react';
import type { TypeaheadOption } from '@tih/ui';
import { Typeahead } from '@tih/ui';

import { trpc } from '~/utils/trpc';

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
    onSelect: (option: TypeaheadOption | null) => void;
    selectedValues?: Set<string>;
  }>;

export default function ResumeLocationTypeahead({
  onSelect,
  selectedValues = new Set(),
  ...props
}: Props) {
  const [query, setQuery] = useState('');
  const countries = trpc.useQuery([
    'locations.countries.list',
    {
      name: query,
    },
  ]);

  const options = useMemo(() => {
    const { data } = countries;
    if (data == null) {
      return [];
    }

    return data
      .map(({ id, name }) => ({
        id,
        label: name,
        value: id,
      }))
      .filter(({ value }) => !selectedValues.has(value));
  }, [countries, selectedValues]);

  return (
    <Typeahead
      label="Location"
      noResultsMessage="No location found"
      nullable={true}
      options={options}
      onQueryChange={setQuery}
      onSelect={onSelect}
      {...props}
    />
  );
}
