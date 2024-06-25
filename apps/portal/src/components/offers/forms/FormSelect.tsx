import type { ComponentProps, ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Select } from '~/ui';

type SelectProps = ComponentProps<typeof Select>;

type FormSelectProps = Omit<SelectProps, 'onChange'>;

function FormSelectWithRef(
  { name, ...rest }: FormSelectProps,
  ref?: ForwardedRef<HTMLSelectElement>,
) {
  const { setValue } = useFormContext();
  return (
    <Select
      {...(rest as SelectProps)}
      ref={ref}
      onChange={(val) => setValue(name || '', val)}
    />
  );
}

const FormSelect = forwardRef(FormSelectWithRef);

export default FormSelect;
