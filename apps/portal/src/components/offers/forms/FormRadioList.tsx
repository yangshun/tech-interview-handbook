import type { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';
import { RadioList } from '~/ui';

type RadioListProps = ComponentProps<typeof RadioList>;

type FormRadioListProps = Omit<RadioListProps, 'onChange'>;

export default function FormRadioList({ name, ...rest }: FormRadioListProps) {
  const { setValue } = useFormContext();
  return (
    <RadioList
      {...(rest as RadioListProps)}
      name={name}
      onChange={(val) => setValue(name || '', val)}
    />
  );
}
