import type { ComponentProps } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import MonthYearPicker from '~/components/shared/MonthYearPicker';

import { getCurrentMonth, getCurrentYear } from '../../../../utils/offers/time';

type MonthYearPickerProps = ComponentProps<typeof MonthYearPicker>;

type FormMonthYearPickerProps = Omit<
  MonthYearPickerProps,
  'onChange' | 'value'
> & {
  name: string;
};

export default function FormMonthYearPicker({
  name,
  ...rest
}: FormMonthYearPickerProps) {
  const { setValue } = useFormContext();

  const value = useWatch({
    defaultValue: { month: getCurrentMonth(), year: getCurrentYear() },
    name,
  });

  return (
    <MonthYearPicker
      {...(rest as MonthYearPickerProps)}
      value={value}
      onChange={(val) => {
        setValue(name, val);
      }}
    />
  );
}
