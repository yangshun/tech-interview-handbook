import type { ComponentProps, ForwardedRef } from 'react';
import { forwardRef } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { TextInput } from '~/ui';

type TextInputProps = ComponentProps<typeof TextInput>;

type FormTextInputProps = Omit<TextInputProps, 'onChange'> &
  Pick<UseFormRegisterReturn<never>, 'onChange'>;

function FormTextInputWithRef(
  { onChange, ...rest }: FormTextInputProps,
  ref?: ForwardedRef<HTMLInputElement>,
) {
  return (
    <TextInput
      {...(rest as TextInputProps)}
      ref={ref}
      onChange={(_, event) => onChange(event)}
    />
  );
}

const FormTextInput = forwardRef(FormTextInputWithRef);

export default FormTextInput;
