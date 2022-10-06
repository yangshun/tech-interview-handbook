import clsx from 'clsx';
import type {
  ChangeEvent,
  FocusEvent,
  ForwardedRef,
  InputHTMLAttributes,
} from 'react';
import React, { forwardRef, useId } from 'react';

type Attributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'autoComplete'
  | 'disabled'
  | 'max'
  | 'maxLength'
  | 'min'
  | 'minLength'
  | 'name'
  | 'onBlur'
  | 'onFocus'
  | 'pattern'
  | 'placeholder'
  | 'required'
  | 'type'
>;

type Props = Readonly<{
  defaultValue?: string;
  endIcon?: React.ComponentType<React.ComponentProps<'svg'>>;
  errorMessage?: React.ReactNode;
  id?: string;
  isLabelHidden?: boolean;
  label: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  startIcon?: React.ComponentType<React.ComponentProps<'svg'>>;
  value?: string;
}> &
  Readonly<Attributes>;

type State = 'error' | 'normal';

const stateClasses: Record<State, string> = {
  error:
    'border-danger-300 text-danger-900 placeholder-danger-300 focus:outline-none focus:ring-danger-500 focus:border-danger-500',
  normal:
    'placeholder:text-slate-400 focus:ring-primary-500 focus:border-primary-500 border-slate-300',
};

function TextInput(
  {
    defaultValue,
    disabled,
    endIcon: EndIcon,
    errorMessage,
    id: idParam,
    isLabelHidden = false,
    label,
    required,
    startIcon: StartIcon,
    type = 'text',
    value,
    onChange,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const hasError = errorMessage != null;
  const generatedId = useId();
  const id = idParam ?? generatedId;
  const errorId = useId();
  const state: State = hasError ? 'error' : 'normal';

  return (
    <div>
      <label
        className={clsx(
          isLabelHidden
            ? 'sr-only'
            : 'block text-sm font-medium text-slate-700',
        )}
        htmlFor={id}>
        {label}
        {required && <span className="text-danger-500 not-sr-only"> *</span>}
      </label>
      <div className="relative mt-1">
        {StartIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <StartIcon aria-hidden="true" className="h-5 w-5 text-slate-400" />
          </div>
        )}
        <input
          ref={ref}
          aria-describedby={hasError ? errorId : undefined}
          aria-invalid={hasError ? true : undefined}
          className={clsx(
            'block w-full rounded-md sm:text-sm',
            StartIcon && 'pl-10',
            EndIcon && 'pr-10',
            stateClasses[state],
            disabled && 'bg-slate-100',
          )}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          required={required}
          type={type}
          value={value != null ? value : undefined}
          onChange={(event) => {
            if (!onChange) {
              return;
            }

            onChange(event.target.value, event);
          }}
          {...props}
        />
        {EndIcon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <EndIcon aria-hidden="true" className="h-5 w-5 text-slate-400" />
          </div>
        )}
      </div>
      {errorMessage && (
        <p className="text-danger-600 mt-2 text-sm" id={errorId}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default forwardRef(TextInput);
