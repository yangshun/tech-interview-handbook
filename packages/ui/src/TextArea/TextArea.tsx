import clsx from 'clsx';
import type {
  ChangeEvent,
  FocusEvent,
  ForwardedRef,
  TextareaHTMLAttributes,
} from 'react';
import React, { forwardRef, useId } from 'react';

type Attributes = Pick<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  | 'autoComplete'
  | 'autoFocus'
  | 'disabled'
  | 'maxLength'
  | 'minLength'
  | 'name'
  | 'onBlur'
  | 'onFocus'
  | 'placeholder'
  | 'readOnly'
  | 'required'
  | 'rows'
>;

export type TextAreaResize = 'both' | 'horizontal' | 'none' | 'vertical';

type Props = Readonly<{
  defaultValue?: string;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  id?: string;
  isLabelHidden?: boolean;
  label: string;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
  resize?: TextAreaResize;
  value?: string;
}> &
  Readonly<Attributes>;

type State = 'error' | 'normal';

const stateClasses: Record<
  State,
  Readonly<{
    textArea: string;
  }>
> = {
  error: {
    textArea:
      'border-danger-300 focus:ring-danger-500 focus:border-danger-500 text-danger-900 placeholder-danger-300',
  },
  normal: {
    textArea:
      'border-slate-300 focus:border-primary-500 focus:ring-primary-500 placeholder:text-slate-400',
  },
};

const resizeClasses: Record<TextAreaResize, string> = {
  both: 'resize',
  horizontal: 'resize-x',
  none: 'resize-none',
  vertical: 'resize-y',
};

function TextArea(
  {
    defaultValue,
    description,
    disabled,
    errorMessage,
    id: idParam,
    isLabelHidden,
    label,
    resize = 'vertical',
    required,
    value,
    onChange,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  const hasError = errorMessage != null;
  const generatedId = useId();
  const id = idParam ?? generatedId;
  const messageId = useId();
  const state: State = hasError ? 'error' : 'normal';

  return (
    <div>
      <label
        className={clsx(
          isLabelHidden
            ? 'sr-only'
            : 'mb-1 block text-sm font-medium text-gray-700',
        )}
        htmlFor={id}>
        {label}
        {required && (
          <span aria-hidden="true" className="text-danger-500">
            {' '}
            *
          </span>
        )}
      </label>
      <div>
        <textarea
          ref={ref}
          aria-describedby={
            hasError || description != null ? messageId : undefined
          }
          aria-invalid={hasError ? true : undefined}
          className={clsx(
            'block w-full rounded-md text-sm disabled:bg-slate-50 disabled:text-slate-500',
            stateClasses[state].textArea,
            resizeClasses[resize],
          )}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          name="comment"
          required={required}
          value={value != null ? value : undefined}
          onChange={(event) => {
            if (!onChange) {
              return;
            }

            onChange(event.target.value, event);
          }}
          {...props}
        />
      </div>
      {(errorMessage ?? description) && (
        <p
          className={clsx(
            'mt-2 text-sm',
            errorMessage ? 'text-danger-600' : 'text-slate-500',
          )}
          id={messageId}>
          {errorMessage ?? description}
        </p>
      )}
    </div>
  );
}

export default forwardRef(TextArea);
