import type { ComponentProps } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import CompaniesTypeahead from '~/components/shared/CompaniesTypeahead';

type Props = Omit<
  ComponentProps<typeof CompaniesTypeahead>,
  'onSelect' | 'value'
> & {
  names: { label: string; value: string };
};

export default function FormCompaniesTypeahead({ names, ...props }: Props) {
  const { setValue } = useFormContext();
  const watchCompanyId = useWatch({
    name: names.value,
  });
  const watchCompanyName = useWatch({
    name: names.label,
  });

  return (
    <CompaniesTypeahead
      {...props}
      value={{
        id: watchCompanyId,
        label: watchCompanyName,
        value: watchCompanyId,
      }}
      onSelect={(option) => {
        setValue(names.value, option?.value);
        setValue(names.label, option?.label);
      }}
    />
  );
}
