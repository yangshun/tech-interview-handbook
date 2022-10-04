import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import React, { useId } from 'react';

type Props = Readonly<{
  autoComplete?: string;
  defaultValue?: string;
  endIcon?: React.ComponentType<React.ComponentProps<'svg'>>;
  errorMessage?: React.ReactNode;
  id?: string;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  label: string;
  name?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  startIcon?: React.ComponentType<React.ComponentProps<'svg'>>;
  type?: 'email' | 'password' | 'text';
  value?: string;
}>;

type State = 'error' | 'normal';

const stateClasses: Record<State, string> = {
  error:
    'border-danger-300 text-danger-900 placeholder-danger-300 focus:outline-none focus:ring-danger-500 focus:border-danger-500',
  normal:
    'placeholder:text-slate-400 focus:ring-primary-500 focus:border-primary-500 border-slate-300',
};

export default function TextInput({
  autoComplete,
  defaultValue,
  endIcon: EndIcon,
  errorMessage,
  id: idParam,
  isDisabled,
  isLabelHidden = false,
  label,
  name,
  placeholder,
  startIcon: StartIcon,
  type = 'text',
  value,
  onChange,
}: Props) {
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
      </label>
      <div className="relative mt-1">
        {StartIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <StartIcon aria-hidden="true" className="h-5 w-5 text-slate-400" />
          </div>
        )}
        <input
          aria-describedby={hasError ? errorId : undefined}
          aria-invalid={hasError ? true : undefined}
          autoComplete={autoComplete}
          className={clsx(
            'block w-full rounded-md sm:text-sm',
            StartIcon && 'pl-10',
            EndIcon && 'pr-10',
            stateClasses[state],
            isDisabled && 'bg-slate-100',
          )}
          defaultValue={defaultValue}
          disabled={isDisabled}
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
          value={value != null ? value : undefined}
          onChange={(event) => {
            if (!onChange) {
              return;
            }

            onChange(event.target.value, event);
          }}
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
