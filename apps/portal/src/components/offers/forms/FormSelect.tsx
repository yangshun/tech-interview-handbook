import type { ComponentProps, ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Select } from '@tih/ui';

type SelectProps = ComponentProps<typeof Select>;

type FormSelectProps = Omit<SelectProps, 'onChange'>;

function FormSelectWithRef(
  props: FormSelectProps,
  ref?: ForwardedRef<HTMLSelectElement>,
) {
  const { name } = props;
  const { setValue } = useFormContext();
  return (
    <Select
      {...(props as SelectProps)}
      ref={ref}
      onChange={(val) => setValue(name || '', val)}
    />
  );
}

const FormSelect = forwardRef(FormSelectWithRef);

export default FormSelect;
