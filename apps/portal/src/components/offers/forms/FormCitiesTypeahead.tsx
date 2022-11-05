import type { ComponentProps } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import CitiesTypeahead from '~/components/shared/CitiesTypeahead';

type Props = Omit<
  ComponentProps<typeof CitiesTypeahead>,
  'onSelect' | 'value'
> & {
  names: { label: string; value: string };
};

export default function FormCitiesTypeahead({ names, ...props }: Props) {
  const { setValue } = useFormContext();
  const watchCityId = useWatch({
    name: names.value,
  });
  const watchCityName = useWatch({
    name: names.label,
  });

  return (
    <CitiesTypeahead
      label="Location"
      {...props}
      value={{
        id: watchCityId,
        label: watchCityName,
        value: watchCityId,
      }}
      onSelect={(option) => {
        setValue(names.value, option?.value);
        setValue(names.label, option?.label);
      }}
    />
  );
}
