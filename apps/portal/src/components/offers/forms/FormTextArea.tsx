import type { ComponentProps, ForwardedRef } from 'react';
import { forwardRef } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { TextArea } from '~/../../../packages/ui/dist';

type TextAreaProps = ComponentProps<typeof TextArea>;

type FormTextAreaProps = Omit<TextAreaProps, 'onChange'> &
  Pick<UseFormRegisterReturn<never>, 'onChange'>;

function FormTextAreaWithRef(
  props: FormTextAreaProps,
  ref?: ForwardedRef<HTMLTextAreaElement>,
) {
  const { onChange, ...rest } = props;
  return (
    <TextArea
      {...(rest as TextAreaProps)}
      ref={ref}
      onChange={(_, event) => onChange(event)}
    />
  );
}

const FormTextArea = forwardRef(FormTextAreaWithRef);

export default FormTextArea;
