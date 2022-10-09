import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { RadioList } from '@tih/ui';

type RadioListProps = ComponentProps<typeof RadioList>;

type FormRadioListProps = Omit<RadioListProps, 'onChange'>;

function FormRadioListWithRef({ name, ...rest }: FormRadioListProps) {
  const { setValue } = useFormContext();
  return (
    <RadioList
      {...(rest as RadioListProps)}
      name={name}
      onChange={(val) => setValue(name || '', val)}
    />
  );
}

const FormRadioList = forwardRef(FormRadioListWithRef);

export default FormRadioList;
