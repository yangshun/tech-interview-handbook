import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import MonthYearPicker from '~/components/shared/MonthYearPicker';

import { getCurrentMonth, getCurrentYear } from '../../../utils/offers/time';

type MonthYearPickerProps = ComponentProps<typeof MonthYearPicker>;

type FormMonthYearPickerProps = Omit<
  MonthYearPickerProps,
  'onChange' | 'value'
> & {
  name: string;
};

function FormMonthYearPickerWithRef({
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
      className="space-x-6"
      {...(rest as MonthYearPickerProps)}
      value={value}
      onChange={(val) => {
        setValue(name, val);
      }}
    />
  );
}

const FormMonthYearPicker = forwardRef(FormMonthYearPickerWithRef);

export default FormMonthYearPicker;
